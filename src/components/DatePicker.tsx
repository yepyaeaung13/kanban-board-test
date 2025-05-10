"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  filterDue: string; // format: YYYY-MM-DD
  setFilterDue: (date: string) => void;
}

export function DatePicker({ filterDue, setFilterDue }: DatePickerProps) {
  const parsedDate = filterDue ? parse(filterDue, "yyyy-MM-dd", new Date()) : undefined;
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selected?: Date) => {
    if (selected && isValid(selected)) {
      const formatted = format(selected, "yyyy-MM-dd");
      setFilterDue(formatted);
      setOpen(false);
    }
  };

  const handleClear = () => {
    setFilterDue(""); // clear the filter (i.e., show all)
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-fit justify-start text-left font-normal gap-2",
            !filterDue && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {filterDue ? format(parsedDate!, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="ghost"
            className="text-xs px-2 py-1"
            onClick={handleClear}
          >
            Show All
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
