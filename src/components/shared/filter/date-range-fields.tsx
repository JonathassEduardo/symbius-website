import { format } from 'date-fns'

import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DatePickerFieldProps = {
  id: string
  label: string
  date: Date
  minDate?: Date
  maxDate?: Date
  onSelect: (date: Date) => void
}

function DatePickerField({
  id,
  label,
  date,
  minDate,
  maxDate,
  onSelect,
}: DatePickerFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className="h-10 w-full justify-start border-input bg-transparent text-left font-normal text-black hover:bg-transparent! hover:text-black! aria-expanded:bg-transparent! aria-expanded:text-black!"
          >
            <CalendarIcon className="mr-2 size-4" />

            {format(date, 'MM/dd/yyyy')}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0"
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={false}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                onSelect(selectedDate)
              }
            }}
            disabled={(day) => {
              if (minDate && day < minDate) {
                return true
              }

              if (maxDate && day > maxDate) {
                return true
              }

              return false
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

type DateRangeFieldsProps = {
  initialDate: Date
  finalDate: Date
  onInitialDateChange: (date: Date) => void
  onFinalDateChange: (date: Date) => void
}

export function DateRangeFields({
  initialDate,
  finalDate,
  onInitialDateChange,
  onFinalDateChange,
}: DateRangeFieldsProps) {
  return (
    <>
      <DatePickerField
        id="initialDate"
        label="Initial date"
        date={initialDate}
        maxDate={finalDate}
        onSelect={onInitialDateChange}
      />

      <DatePickerField
        id="finalDate"
        label="Final date"
        date={finalDate}
        minDate={initialDate}
        onSelect={onFinalDateChange}
      />
    </>
  )
}