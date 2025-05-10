"use client"

import * as React from "react"
import { CalendarIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  filterDue: string // format: YYYY-MM-DD
  setFilterDue: (date: string) => void
}

export function DatePicker({ filterDue, setFilterDue }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDue(e.target.value)
    setOpen(false)
  }

  const handleClear = () => {
    setFilterDue("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 justify-start text-left font-normal"
        >
          <CalendarIcon className="h-4 w-4" />
          {filterDue ? new Date(filterDue).toLocaleDateString() : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex flex-col gap-2">
          <input
            type="date"
            value={filterDue}
            onChange={handleSelect}
            className="border rounded-md px-2 py-1 text-sm"
          />
          <Button variant="ghost" className="text-xs px-2 py-1 self-start" onClick={handleClear}>
            <X className="w-3 h-3 mr-1" />
            Show All
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
