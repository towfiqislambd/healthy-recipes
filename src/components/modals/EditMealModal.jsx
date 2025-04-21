import { useState } from 'react';
import { DialogContent, DialogHeader } from '../ui/dialog';
import { useAllRecipes } from '@/hooks/cms.queries';
import { useEditMealPlanner } from '@/hooks/cms.mutations';
import toast from 'react-hot-toast';

const EditMealModal = ({ itemId, setOpen }) => {
    const { data: allRecipes } = useAllRecipes();
    const [selectedRecipeId, setSelectedRecipeId] = useState('');
    const { mutateAsync: editMealPlan } = useEditMealPlanner(itemId);

    const handleSelectChange = (e) => {
        setSelectedRecipeId(e.target.value);
    };

    const handleEditRecipe = () => {
        if (!selectedRecipeId) {
            toast.error('Please select a recipe before updating.');
            return;
        }

        const data = { recipe_id: selectedRecipeId };
        editMealPlan(data);
        setOpen(false);
    };


    return (
        <DialogContent className={'max-w-lg font-inter'}>
            <DialogHeader>
                <>
                    <div>
                        <label className="mb-3 font-poppins text-lg block font-medium text-[#5A5C5F]">All Recipes</label>
                        <select
                            className="border rounded-[5px] px-3 py-3 outline-none block w-full"
                            value={selectedRecipeId}
                            onChange={handleSelectChange}
                        >
                            {
                                allRecipes?.map((item, idx) => (
                                    <option key={idx} value={item?.id}>
                                        {item?.recipe_name}
                                    </option>
                                ))
                            }
                        </select>

                    </div>

                    {/* buttons */}
                    <div className="pt-6 pb-3 flex items-center justify-center gap-3">
                        <button
                            onClick={handleEditRecipe}
                            className="px-5 py-2.5 border border-primary bg-primary text-white rounded-md"
                        >
                            Update recipe
                        </button>

                        <button
                            onClick={() => setOpen(false)}
                            className="px-8 py-2.5 border border-primary text-primary rounded-md">
                            cancel
                        </button>
                    </div>
                </>
            </DialogHeader>
        </DialogContent>
    );
};

export default EditMealModal;