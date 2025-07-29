"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";
import { VolunteerFormType } from "@/lib/types";
import { format } from "date-fns";

export function DatePicker({
  setValue,
  watch,
  trigger,
}: {
  setValue: UseFormSetValue<VolunteerFormType>;
  watch: UseFormWatch<VolunteerFormType>;
  trigger: UseFormTrigger<VolunteerFormType>;
}) {
  const [open, setOpen] = React.useState(false);

  const date = watch("startDate");

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? format(date, "PPP") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                setValue("startDate", date);
                trigger("startDate");
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
