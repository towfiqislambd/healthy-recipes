import { AddMoreSvg, CameraSvg } from "@/components/svg-container/SvgContainer";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DashboardShareRecipe = () => {
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState(""); 
    const [instructions, setInstructions] = useState([{ id: Date.now(), value: "" }]);
    const [ingredients, setIngredients] = useState([{ id: Date.now(), value: "" }])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // All the form data is here
    const onSubmit = (data) => {
        console.log(data);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        const value = inputValue.trim();

        if ((e.key === "Enter" || e.key === "," || e.key === " ") && value && tags.length < 10) {
            e.preventDefault();
            if (!tags.includes(value)) {
                setTags([...tags, value]);
            }
            setInputValue(""); // Reset input value
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleIngredientChange = (e, id) => {
        setIngredients(
            ingredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, value: e.target.value } : ingredient
            )
        );
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), value: "" }]);
    };

    const handleInstructionChange = (e, id) => {
        setInstructions(
            ingredients.map((instruction) =>
                instruction.id === id ? { ...instruction, value: e.target.value } : instruction
            )
        );
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
                        onChange={(e) => setVideo(e.target.files?.[0] || null)}
                        accept="video/mp4,video/x-m4v,video/*"
                        type="file"
                        className="hidden"
                        id="video" />
                    {
                        video && (
                            <div className="h-[260px] mt-2 w-full">
                                <video
                                    controls
                                    src={URL.createObjectURL(video)}
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </div>
                        )
                    }
                </div>

                {/* Thumbnail */}
                <div>
                    <p className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Thumbnail</p>
                    <label htmlFor="thumbnail">
                        <p className="flex gap-2 w-fit cursor-pointer items-center text-white py-[10px] px-4 rounded-lg bg-[#8993A4]"> Select Featured Image</p>
                    </label>
                    <input
                        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                        type="file"
                        className="hidden w-fit"
                        id="thumbnail" />
                    {
                        thumbnail && (
                            <div className="h-[260px] mt-2 w-full">
                                <img
                                    src={URL.createObjectURL(thumbnail)}
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </div>
                        )
                    }
                </div>

                {/* Categories */}
                <div>
                    <label className="mb-2 block font-poppins font-medium text-[#5A5C5F]">Categories</label>
                    <select className="border rounded-[5px] px-3 py-3 outline-none block w-full">
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Salad">Salad</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Snacks">Snacks</option>
                    </select>
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
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => handleTagRemove(tag)}
                                    >
                                        &times;
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
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
                            {/* Only show instruction text for the first ingredient */}
                            {index === 0 && (
                                <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">e.g. "¼ teaspoon salt"</p>
                            )}
                        </div>
                    ))}
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

                {/* Instruction */}
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
                            {/* Only show instruction text for the first ingredient */}
                            {index === 0 && (
                                <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">e.g. "Grease a 6-quart slow cooker with cooking spray. Add in chicken bouillon cubes."</p>
                            )}
                        </div>
                    ))}
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
                    <p className="text-sm px-2 py-1 bg-[#F4F5F7] w-fit rounded text-black mt-2">Recipe Source Link. e.g. https://example.com/easy-chicken-dinner-recipe</p>
                    {errors.source && <span className="text-red-500 block mt-2 text-[15px]">Recipe source link is required</span>}
                </div>

                {/* Submit and cancel btns */}
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2 bg-[#3F3F3F] rounded-[6px] text-white border">Submit here</button>
                    <button onClick={e => e.preventDefault()} className="px-5 py-2 border-[#3F3F3F] rounded-[6px]  border">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default DashboardShareRecipe;
