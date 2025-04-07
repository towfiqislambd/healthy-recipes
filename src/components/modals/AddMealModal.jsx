import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react';

const AddMealModal = ({ setOpen }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  return (
    <DialogContent className={'max-w-lg font-inter'}>
      <DialogHeader>
        <DialogTitle> </DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="w-full">
          {/* title */}
          <h5 className=" font-newBaskerville text-[#5A5C5F] leading-[132%] text-xl">
            Choose day of the week to save meal to:
          </h5>

          <div className="flex gap-5 items-center mt-7 mb-7">
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex-1 py-3 px-5 text-[#5A5C5F] border rounded-lg border-[#8993A4]'>
                  {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span>or</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex-1 py-3 px-5 text-[#5A5C5F] border rounded-lg border-[#8993A4]'>
                  {endDate ? format(endDate, "PPP") : <span>End date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select>
            <SelectTrigger className="w-full py-5">
              <SelectValue placeholder="All type of food" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Dinner">Dinner</SelectItem>
              <SelectItem value="Appetizer">Appetizer</SelectItem>
              <SelectItem value="Beverages">Beverages</SelectItem>
              <SelectItem value="Salad">Salad</SelectItem>
              <SelectItem value="Deserts">Deserts</SelectItem>
              <SelectItem value="Snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>

          {/* buttons */}
          <div className="py-6 flex items-center justify-end gap-3">
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 border border-primary bg-primary text-white rounded-md"
            >
              Add to planner
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-8 py-2.5 border border-primary text-primary rounded-md">
              cancel
            </button>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddMealModal;
