import { AddMoreSvg, CameraSvg } from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DashboardShareRecipe = () => {
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [instructions, setInstructions] = useState([{ id: Date.now(), value: "" }]);
    const [ingredients, setIngredients] = useState([{ id: Date.now(), value: "" }]);
    const [customErrors, setCustomErrors] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const updateCustomErrors = (key) => {
        setCustomErrors((prev) => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
    };

    const onSubmit = (data) => {
        const newErrors = {};

        if (!video) newErrors.video = "Video is required.";
        if (!thumbnail) newErrors.thumbnail = "Thumbnail is required.";
        if (tags.length === 0) newErrors.tags = "At least one tag is required.";
        if (ingredients.filter(i => i.value.trim()).length === 0)
            newErrors.ingredients = "Add at least one ingredient.";
        if (instructions.filter(i => i.value.trim()).length === 0)
            newErrors.instructions = "Add at least one instruction.";

        setCustomErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const formData = {
            ...data,
            video,
            thumbnail,
            tags,
            ingredients: ingredients.map(i => i.value).filter(Boolean),
            instructions: instructions.map(i => i.value).filter(Boolean),
        };

        console.log(formData);
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

                {/* Title */}
                <div>
                    <label htmlFor="title" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Title</label>
                    <input
                        {...register('title', { required: true })}
                        placeholder="Write recipe name"
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Maximum 20 words</p>
                    {errors.title && <span className="text-red-500 block mt-2 text-[15px]">Recipe name is required</span>}
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Content</label>
                    <textarea id="content" rows={5} className="border rounded-[5px] px-4 py-3 outline-none block w-full" placeholder="Write here...." {...register('content', { required: true })}></textarea>
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Maximum 1000 words</p>
                    {errors.content && <span className="text-red-500 block mt-2 text-[15px]">Content is required</span>}
                </div>

                {/* Video */}
                <div>
                    <p className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Upload a video</p>
                    <label htmlFor="video">
                        <p className="flex gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-primary">
                            <CameraSvg />
                            <span>Add Media</span>
                        </p>
                    </label>
                    <input
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setVideo(file);
                            if (file) updateCustomErrors("video");
                        }}
                        accept="video/mp4,video/x-m4v,video/*"
                        type="file"
                        className="hidden"
                        id="video"
                    />
                    {video && (
                        <div className="h-[260px] mt-2 w-full">
                            <video controls src={URL.createObjectURL(video)} className="w-full h-full rounded-lg object-cover" />
                        </div>
                    )}
                    {customErrors.video && <p className="text-red-500 mt-2">{customErrors.video}</p>}
                </div>

                {/* Thumbnail */}
                <div>
                    <p className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Thumbnail</p>
                    <label htmlFor="thumbnail">
                        <p className="flex gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-[#8993A4]">Select Featured Image</p>
                    </label>
                    <input
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setThumbnail(file);
                            if (file) updateCustomErrors("thumbnail");
                        }}
                        type="file"
                        className="hidden"
                        id="thumbnail"
                    />
                    {thumbnail && (
                        <div className="h-[260px] mt-2 w-full">
                            <img src={URL.createObjectURL(thumbnail)} className="w-full h-full rounded-lg object-cover" />
                        </div>
                    )}
                    {customErrors.thumbnail && <p className="text-red-500 mt-2">{customErrors.thumbnail}</p>}
                </div>

                {/* Categories */}
                <div>
                    <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Categories</label>
                    <select
                        {...register('categories', { required: true })}
                        className="border rounded-[5px] px-3 py-3 outline-none block w-full"
                    >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Salad">Salad</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Snacks">Snacks</option>
                    </select>
                    {errors.categories && <span className="text-red-500 block mt-2 text-[15px]">Select a category</span>}
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
                    <label htmlFor="source" className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Recipe Source Link</label>
                    <input
                        {...register('source', { required: true })}
                        className="border rounded-[5px] px-4 py-3 outline-none block w-full"
                    />
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">e.g. https://example.com/easy-chicken-dinner-recipe</p>
                    {errors.source && <span className="text-red-500 block mt-2 text-[15px]">Recipe source link is required</span>}
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