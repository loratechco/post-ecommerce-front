"use client"

import {useState , useEffect} from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

const today = new Date();


export function DatePickerInput({getDate}:{getDate:(value:object)=>void}) {
  const nowYear = today.getFullYear();
  const nowMonth = String(today.getMonth() + 1).padStart(2, '0'); 
  const nowDay = Number(String(today.getDate()).padStart(2, '0'));

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(nowYear|| 2024, 0, +nowMonth),
    to: addDays(new Date(nowYear||2024, 0, 20), 20),
  })

  useEffect(()=>getDate(date as DateRange),[date,getDate])

  return (
    <Popover >
      <PopoverTrigger asChild>
       
      <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-full border-zinc-400",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>

      </PopoverTrigger>
      <PopoverContent
        className="z-[1050] w-auto p-0"
        side="bottom"
        align="start"
        sideOffset={nowDay || 1}
      >
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

