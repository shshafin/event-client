"use client";

import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FXSelect = ({
  options,
  name,
  label,
  disabled,
  required = false,
}: any) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Select
        onValueChange={(val) => setValue(name, val)}
        value={value || ""}
        disabled={disabled}>
        <SelectTrigger
          id={name}
          className={errorMessage ? "border-red-500 focus:ring-red-500" : ""}>
          <SelectValue placeholder={`Select ${label || name}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem
              key={option.key}
              value={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default FXSelect;
