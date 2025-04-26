import { DialogContent, DialogHeader } from '../ui/dialog';
import { useState } from 'react';
import { useAllCategories } from '@/hooks/cms.queries';
import { useAddMealPlanner } from '@/hooks/cms.mutations';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const AddMealModal = ({ recipeId, setOpen }) => {
  const filterClass = `text-base py-2  px-3 focus:bg-primary font-poppins text-textColor focus:text-white cursor-pointer`;
  const { mutateAsync: addMealPlanner } = useAddMealPlanner(recipeId);
  const { data: recipeCategory } = useAllCategories();
  const [category_id, setCategoryId] = useState("");
  const [day, setDay] = useState("");

  const handleDayChange = (value) => {
    setDay(value);
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
  };

  const handleAddPlan = async () => {

    if (!category_id || !day) {
      toast.error("Please select at least a day and a category");
      return;
    }

    const data = { day, category_id };

    await addMealPlanner(data);
    setCategoryId("");
    setDay("");
    setOpen(false);
  };

  return (
    <DialogContent className={'max-w-lg font-inter'}>
      <DialogHeader>
        <div className="w-full">

          {/* title */}
          <h5 className=" font-newBaskerville font-semibold text-center text-[#5A5C5F] leading-[132%] text-lg mt-5 md:text-xl">
            Plan for a meal
          </h5>

          {/* Day */}
          <div className="mt-5 md:mt-7 mb-5">
            <Select onValueChange={handleDayChange}>
              <SelectTrigger className="w-full h-11 rounded-[6px] px-4 text-base focus:ring-primary">
                <SelectValue placeholder="Select a day..." />
              </SelectTrigger>
              <SelectContent className="px-0 py-0">
                <SelectItem value='saturday' className={filterClass}>Saturday</SelectItem>
                <SelectItem value='sunday' className={filterClass}>Sunday</SelectItem>
                <SelectItem value='monday' className={filterClass}>Monday</SelectItem>
                <SelectItem value='tuesday' className={filterClass}>Tuesday</SelectItem>
                <SelectItem value='wednesday' className={filterClass}>Wednesday</SelectItem>
                <SelectItem value='thursday' className={filterClass}>Thursday</SelectItem>
                <SelectItem value='friday' className={filterClass}>Friday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full h-11 rounded-[6px] px-4 text-base focus:ring-primary">
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent className="px-0 py-0">
              {
                recipeCategory?.map((item, idx) => (
                  <SelectItem key={idx} value={item?.id} className={filterClass}>
                    {item?.category_name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>

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
              Cancel
            </button>
          </div>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default AddMealModal;
