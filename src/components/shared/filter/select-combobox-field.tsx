import { useMemo, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'

const clearValue = '__clear__'

type SelectComboBoxFieldOption<T extends string> =
  | T
  | {
      value: T
      label: string
    }

type SelectComboBoxFieldProps<T extends string> = {
  id: string
  label: string
  placeholder: string
  searchPlaceholder?: string
  emptyMessage?: string
  options: readonly SelectComboBoxFieldOption<T>[]
  value: T | undefined
  onChange: (value: T | undefined) => void
}

function normalizeOption<T extends string>(
  option: SelectComboBoxFieldOption<T>,
): {
  value: T
  label: string
} {
  return typeof option === 'string'
    ? {
        value: option,
        label: option,
      }
    : option
}

export function SelectComboBoxField<T extends string>({
  id,
  label,
  placeholder,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  options,
  value,
  onChange,
}: SelectComboBoxFieldProps<T>) {
  const [open, setOpen] = useState(false)

  const normalizedOptions = useMemo(
    () => options.map(normalizeOption),
    [options],
  )

  const selectedOption = normalizedOptions.find(
    (option) => option.value === value,
  )

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
         <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-10 w-full justify-between border-input bg-card font-normal text-card-foreground hover:bg-card hover:text-card-foreground data-[state=open]:bg-card data-[state=open]:text-card-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span
              className={cn(
                'truncate',
                !selectedOption && 'text-muted-foreground',
              )}
            >
              {selectedOption?.label ?? placeholder}
            </span>

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] border border-border bg-card p-0 text-card-foreground"
              align="start"
              side="bottom"
              avoidCollisions={false}
            >
          <Command className="border-b border-border bg-card">
            <CommandInput placeholder={searchPlaceholder} />

            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>{emptyMessage}</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  value={clearValue}
                  onSelect={() => {
                    onChange(undefined)
                    setOpen(false)
                  }}
                  className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  {placeholder}
                  <Check
                    className={cn(
                      'ml-auto size-4',
                      !value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>

                {normalizedOptions.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={`${item.label} ${item.value}`}
                    onSelect={() => {
                      onChange(
                        item.value === value ? undefined : item.value,
                      )
                      setOpen(false)
                    }}
                    className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    {item.label}

                    <Check
                      className={cn(
                        'ml-auto size-4',
                        value === item.value
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}