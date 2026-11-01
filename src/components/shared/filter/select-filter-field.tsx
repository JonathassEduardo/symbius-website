import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

const clearValue = "__clear__";

type SelectFilterFieldOption<T extends string> =
  | T
  | {
      value: T;
      label: string;
    };

type SelectFilterFieldProps<T extends string> = {
  id: string;
  label?: ReactNode;
  placeholder: string;
  options: readonly SelectFilterFieldOption<T>[];
  value: T | undefined;
  onChange: (value: T | undefined) => void;
};

function normalizeOption<T extends string>(
  option: SelectFilterFieldOption<T>,
): {
  value: T;
  label: string;
} {
  return typeof option === "string"
    ? {
        value: option,
        label: option,
      }
    : option;
}

export function SelectFilterField<T extends string>({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectFilterFieldProps<T>) {
  const normalizedOptions = options.map(normalizeOption);

  return (
    <div className="space-y-1.5">
      {label != null && <Label htmlFor={id}>{label}</Label>}

      <Select
        value={value ?? clearValue}
        onValueChange={(newValue) =>
          onChange(
            newValue === clearValue
              ? undefined
              : (newValue as T),
          )
        }
      >
        <SelectTrigger
          id={id}
          className="data-[size=default]:h-10 w-full data-[placeholder]:text-muted-foreground"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          side="bottom"
          sideOffset={4}
          avoidCollisions={false}
        >
          <SelectItem
            value={clearValue}
            disabled
            className="text-muted-foreground data-[disabled]:opacity-100"
          >
            {placeholder}
          </SelectItem>

          {normalizedOptions.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}