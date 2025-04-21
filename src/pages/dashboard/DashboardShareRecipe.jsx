import { AddMoreSvg, CameraSvg } from "@/components/svg-container/SvgContainer";
import { useAddRecipe } from "@/hooks/cms.mutations";
import { useAllCategories, useRecipeLibrary } from "@/hooks/cms.queries";
import { useState } from "react";
import { useForm } from "react-hook-form";
const ageData = [
    {
        id: 1,
        label: 'Teen (13–19 years)',
        value: 'teen'
    },
    {
        id: 2,
        label: 'Adult (20–39 years)',
        value: 'adult'
    },
    {
        id: 3,
        label: 'Middle adulthood (40–59 years)',
        value: 'middle-adulthood'
    },
    {
        id: 4,
        label: 'Senior Adult (60+)',
        value: 'senior-adult'
    },
]

const DashboardShareRecipe = () => {
    const { mutateAsync: recipeMutation } = useAddRecipe();
    const { data: recipeCategory } = useAllCategories();
    const { data: allLibrary } = useRecipeLibrary();
    const [recipe_video, setRecipeVideo] = useState(null);
    const [recipe_image, setRecipeImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [instructions, setInstructions] = useState([{ id: Date.now(), value: "" }]);
    const [ingredients, setIngredients] = useState([{ id: Date.now(), value: "" }]);
    const [customErrors, setCustomErrors] = useState({});

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const updateCustomErrors = (key) => {
        setCustomErrors((prev) => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
    };

    const onSubmit = async (data) => {
        const newErrors = {};
        if (!recipe_video) newErrors.recipe_video = "Recipe video is required.";
        if (!recipe_image) newErrors.recipe_image = "Thumbnail image is required.";
        if (tags.length === 0) newErrors.tags = "At least one tag is required.";
        if (ingredients.filter(i => i.value.trim()).length === 0)
            newErrors.ingredients = "Add at least one ingredient.";
        if (instructions.filter(i => i.value.trim()).length === 0)
            newErrors.instructions = "Add at least one instruction.";
        setCustomErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const formData = new FormData();

        // Append regular fields
        formData.append("recipe_name", data.recipe_name);
        formData.append("category_id", data.category_id);
        formData.append("recipe_library_id", data.recipe_library_id);
        formData.append("age_group", data.age_group);
        formData.append("serving_number", data.serving_number);
        formData.append("cooking_time", data.cooking_time);
        formData.append("preparation_time", data.preparation_time);
        formData.append("nutrition_info", data.nutrition_info);
        formData.append("resource_link", data.resource_link);

        // Append files
        formData.append("recipe_video", recipe_video);
        formData.append("recipe_image", recipe_image);

        // Append array data
        tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag));
        ingredients
            .filter(i => i.value.trim())
            .forEach((ing, i) => formData.append(`ingredients[${i}]`, ing.value));
        instructions
            .filter(i => i.value.trim())
            .forEach((inst, i) => formData.append(`instructions[${i}]`, inst.value));

        await recipeMutation(formData);
        reset();
    };

    const handleInputChange = (e) => setInputValue(e.target.value);
    const handleKeyDown = (e) => {
        const value = inputValue.trim();
        if ((e.key === "Enter" || e.key === "," || e.key === " ") && value && tags.length < 10) {
            e.preventDefault();
            if (!tags.includes(value)) {
                const updatedTags = [...tags, value];
                setTags(updatedTags);
                if (updatedTags.length > 0) updateCustomErrors("tags");
            }
            setInputValue("");
        }
    };
    const handleTagRemove = (tagToRemove) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
        if (updatedTags.length > 0) updateCustomErrors("tags");
    };
    const handleIngredientChange = (e, id) => {
        const updated = ingredients.map((ingredient) =>
            ingredient.id === id ? { ...ingredient, value: e.target.value } : ingredient
        );
        setIngredients(updated);
        if (updated.some(i => i.value.trim())) updateCustomErrors("ingredients");
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), value: "" }]);
    };

    const handleInstructionChange = (e, id) => {
        const updated = instructions.map((instruction) =>
            instruction.id === id ? { ...instruction, value: e.target.value } : instruction
        );
        setInstructions(updated);
        if (updated.some(i => i.value.trim())) updateCustomErrors("instructions");
    };

    const addInstruction = () => {
        setInstructions([...instructions, { id: Date.now(), value: "" }]);
    };


    return (
        <div className="max-w-[752px] mx-auto py-10">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">Share your recipe</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Recipe Name */}
                <div>
                    <label htmlFor="recipe_name" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Recipe Name</label>
                    <input
                        {...register('recipe_name', { required: true })}
                        placeholder="Write recipe name"
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Maximum 20 words</p>
                    {errors.recipe_name && <span className="text-red-500 block mt-2 text-[15px]">Recipe name is required</span>}
                </div>

                {/* Recipe Image */}
                <div>
                    <p className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Thumbnail</p>
                    <label htmlFor="recipe_image">
                        <p className="flex gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-[#8993A4]">Select Featured Image</p>
                    </label>
                    <input
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setRecipeImage(file);
                            if (file) updateCustomErrors("recipe_image");
                        }}
                        type="file"
                        className="hidden"
                        id="recipe_image"
                    />
                    {recipe_image && (
                        <div className="h-[260px] mt-2 w-full">
                            <img src={URL.createObjectURL(recipe_image)} className="w-full h-full rounded-lg object-cover" />
                        </div>
                    )}
                    {customErrors.recipe_image && <p className="text-red-500 mt-2">{customErrors.recipe_image}</p>}
                </div>

                {/* Recipe Video */}
                <div>
                    <p className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Upload a video</p>
                    <label htmlFor="recipe_video">
                        <p className="flex gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-primary">
                            <CameraSvg />
                            <span>Add Media</span>
                        </p>
                    </label>
                    <input
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setRecipeVideo(file);
                            if (file) updateCustomErrors("recipe_video");
                        }}
                        accept="video/mp4,video/x-m4v,video/*"
                        type="file"
                        className="hidden"
                        id="recipe_video"
                    />
                    {recipe_video && (
                        <div className="h-[260px] mt-2 w-full">
                            <video controls src={URL.createObjectURL(recipe_video)} className="w-full h-full rounded-lg object-cover" />
                        </div>
                    )}
                    {customErrors.recipe_video && <p className="text-red-500 mt-2">{customErrors.recipe_video}</p>}
                </div>

                {/* Categories */}
                <div>
                    <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Categories</label>
                    <select
                        {...register('category_id', { required: true })}
                        className="border rounded-[5px] px-3 py-3 outline-none block w-full"
                    >
                        {
                            recipeCategory?.map((item, idx) => <option key={idx} value={item?.id}>{item?.category_name}</option>)
                        }
                    </select>
                    {errors.category_id && <span className="text-red-500 block mt-2 text-[15px]">Select a category</span>}
                </div>


                {/* Library */}
                <div>
                    <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Select a library</label>
                    <select
                        {...register('recipe_library_id', { required: true })}
                        className="border rounded-[5px] px-3 py-3 outline-none block w-full"
                    >
                        {
                            allLibrary?.map((item, idx) => <option key={idx} value={item?.id}>{item?.diet_name}</option>)
                        }
                    </select>
                    {errors.recipe_library_id && <span className="text-red-500 block mt-2 text-[15px]">Select a library</span>}
                </div>

                {/* Age group */}
                <div>
                    <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Select age group</label>
                    <select
                        {...register('age_group', { required: true })}
                        className="border rounded-[5px] px-3 py-3 outline-none block w-full"
                    >
                        {
                            ageData?.map((item, idx) => <option key={idx} value={item?.value}>{item?.label}</option>)
                        }
                    </select>
                    {errors.age_group && <span className="text-red-500 block mt-2 text-[15px]">Select age group</span>}
                </div>

                {/* Serving number */}
                <div>
                    <label htmlFor="serving_number" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Serving number</label>
                    <input
                        {...register('serving_number', { required: true })}
                        placeholder="4"
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Numeric values e.g. 2, 3, 4, 5</p>
                    {errors.serving_number && <span className="text-red-500 block mt-2 text-[15px]">Serving number is required</span>}
                </div>

                {/* Cooking time */}
                <div>
                    <label htmlFor="cooking_time" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Cooking time</label>
                    <input
                        {...register('cooking_time', { required: true })}
                        placeholder="30 min"
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Numeric values for time e.g. 20min, 30min, 40min</p>
                    {errors.cooking_time && <span className="text-red-500 block mt-2 text-[15px]">Cooking time is required</span>}
                </div>

                {/* Preparation time */}
                <div>
                    <label htmlFor="preparation_time" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Preparation time</label>
                    <input
                        {...register('preparation_time', { required: true })}
                        placeholder="40 min"
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Numeric values for time e.g. 20min, 30min, 40min</p>
                    {errors.preparation_time && <span className="text-red-500 block mt-2 text-[15px]">Preparation time is required</span>}
                </div>

                {/* Nutrition Info */}
                <div>
                    <label htmlFor="nutrition_info" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Nutrition Info</label>
                    <textarea id="nutrition_info" rows={5} className="border rounded-[5px] px-4 py-3 outline-none block w-full" placeholder="Write here...." {...register('nutrition_info', { required: true })}></textarea>
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Maximum 1000 words</p>
                    {errors.nutrition_info && <span className="text-red-500 block mt-2 text-[15px]">Nutrition Info is required</span>}
                </div>

                {/* Tags */}
                <div>
                    <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Tags</label>
                    <input
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                        placeholder="Add tags (separate by commas or spaces)"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Maximum 10 keywords, should all be in lowercase and separated by commas. e.g. pizza, bacon etc.</p>
                    <div className="mt-2">
                        <ul className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <li key={index} className="bg-[#E4E4E4] text-[#5A5C5F] px-3 py-1 rounded-full flex items-center gap-2">
                                    {tag}
                                    <button type="button" className="text-red-500" onClick={() => handleTagRemove(tag)}>&times;</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {customErrors.tags && <p className="text-red-500 mt-2">{customErrors.tags}</p>}
                </div>

                {/* Ingredients */}
                <div>
                    {ingredients.map((ingredient, index) => (
                        <div className="mt-5" key={ingredient.id}>
                            <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Ingredients ({index + 1})</label>
                            <input
                                className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                                value={ingredient.value}
                                onChange={(e) => handleIngredientChange(e, ingredient.id)}
                            />
                            {index === 0 && (
                                <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">e.g. "¼ teaspoon salt"</p>
                            )}
                        </div>
                    ))}
                    {customErrors.ingredients && <p className="text-red-500 mt-2">{customErrors.ingredients}</p>}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addIngredient();
                        }}
                        className="flex mt-5 gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-primary"
                    >
                        <AddMoreSvg />
                        <p>Add more ingredient</p>
                    </button>
                </div>

                {/* Instructions */}
                <div>
                    {instructions.map((instruction, index) => (
                        <div className="mt-5" key={instruction.id}>
                            <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Instructions (Step-{index + 1})</label>
                            <textarea
                                rows={3}
                                className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                                value={instruction.value}
                                onChange={(e) => handleInstructionChange(e, instruction.id)}
                            />
                            {index === 0 && (
                                <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">e.g. "Grease a 6-quart slow cooker with cooking spray. Add in chicken bouillon cubes."</p>
                            )}
                        </div>
                    ))}
                    {customErrors.instructions && <p className="text-red-500 mt-2">{customErrors.instructions}</p>}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addInstruction();
                        }}
                        className="flex mt-5 gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-primary"
                    >
                        <AddMoreSvg />
                        <p>Add more instruction</p>
                    </button>
                </div>

                {/* Recipe source link */}
                <div>
                    <label htmlFor="resource_link" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Recipe Source Link</label>
                    <input
                        {...register('resource_link')}
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">e.g. https://example.com/easy-chicken-dinner-recipe</p>
                </div>

                {/* Submit & Cancel */}
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2 bg-[#3F3F3F] rounded-[6px] text-white border">Submit here</button>
                    <button onClick={e => e.preventDefault()} className="px-5 py-2 border-[#3F3F3F] rounded-[6px] border">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default DashboardShareRecipe;