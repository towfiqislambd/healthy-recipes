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
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react';
import { useAllCategories } from '@/hooks/cms.queries';
import { useAddMealPlanner } from '@/hooks/cms.mutations';
import toast from 'react-hot-toast';

const AddMealModal = ({ recipeId, setOpen }) => {
  const { mutateAsync: addMealPlanner } = useAddMealPlanner(recipeId);
  const { data: recipeCategory } = useAllCategories();
  const [category_id, setCategoryId] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  const formattedDates = selectedDates?.map(date => ({
    date: format(date, "yyyy-MM-dd")
  }));

  const modifiedDates = selectedDates?.map(date => format(date, "yyyy-MM-dd"));

  const handleAddPlan = async () => {
    if (!category_id || selectedDates.length === 0) {
      toast.error("Please select at least one date and a category");
      return;
    }

    const data = {
      date: modifiedDates,
      category_id
    };

    await addMealPlanner(data);
    setCategoryId("");
    setSelectedDates([]);
    setOpen(false);
  };


  return (
    <DialogContent className={'max-w-lg font-inter'}>
      <DialogHeader>
        <DialogTitle> </DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="w-full">
          {/* title */}
          <h5 className=" font-newBaskerville font-semibold text-center text-[#5A5C5F] leading-[132%] text-lg mt-5 md:text-xl">
            Plan for a meal
          </h5>

          <div className="mt-5 md:mt-7 mb-5 md:mb-7">
            <Popover>
              <PopoverTrigger asChild>
                <button className='w-full px-3 py-2 md:py-3 md:px-5 text-[#5A5C5F] border rounded-lg border-[#8993A4] text-left'>
                  {formattedDates?.length > 0
                    ? formattedDates.map(d => d.date).join(', ')
                    : <span>Select date(s)</span>
                  }
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Categories */}
          <select
            className="border rounded-[5px] px-3 py-3 outline-none block w-full"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            {
              recipeCategory?.map((item, idx) => (
                <option key={idx} value={item?.id}>
                  {item?.category_name}
                </option>
              ))
            }
          </select>

          {/* buttons */}
          <div className="pt-6 pb-3 flex items-center justify-center gap-3">
            <button
              onClick={handleAddPlan}
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
