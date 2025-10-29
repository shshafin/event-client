"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FXDatePicker = ({ label, name, required = false }: any) => {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Popover
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                className="w-full justify-between font-normal">
                {value ? new Date(value).toLocaleDateString() : "Select date"}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default FXDatePicker;
