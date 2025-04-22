import { useState } from 'react';
import { DialogContent, DialogHeader } from '../ui/dialog';
import { useEditMealPlanner } from '@/hooks/cms.mutations';
import toast from 'react-hot-toast';

const EditMealModal = ({ itemId, setOpen }) => {
    const [recipeRename, setRecipeRename] = useState('');
    const { mutateAsync: editMealPlan } = useEditMealPlanner(itemId);

    const handleEditRecipe = () => {
        if (!recipeRename) {
            toast.error('Please write something before updating.');
            return;
        }
        const data = { name: recipeRename };
        editMealPlan(data);
        setOpen(false);
    };

    return (
        <DialogContent className={'max-w-lg font-inter'}>
            <DialogHeader>
                <>
                    <div>
                        <label className="mb-3 font-poppins text-lg block font-medium text-[#5A5C5F]">Edit Recipe</label>
                        <input
                            type="text"
                            className="border rounded-[5px] px-3 py-3 outline-none block w-full"
                            placeholder='Write Something....'
                            onChange={(e) => setRecipeRename(e.target.value)}
                        />
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