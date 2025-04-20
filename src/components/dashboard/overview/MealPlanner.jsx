import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useMealPlannerTable } from '@/hooks/cms.queries';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from 'react-router-dom';

const MealPlanner = () => {
    const { data: mealPlannerTableData, isLoading } = useMealPlannerTable();

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h3 className="font-merriweather font-semibold text-[#141414] text-xl">Your customize meal planner</h3>

            {/* Table */}
            <table className="bg-[#F6F7FB] px-5 rounded w-full border-separate border-spacing-y-5">
                <thead>
                    <tr className="text-[#5A5C5F] text-lg text-center font-merriweather">
                        <th className="bg-[#FCBD66] w-[10%] py-3 px-5">
                            Weekly Days (January)
                        </th>
                        <th
                            colSpan={7}
                            className="bg-[#B7E4C7] py-6 font-medium w-[90%]"
                        >
                            Food Menus
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mealPlannerTableData?.length > 0 ?
                            mealPlannerTableData?.map((data) => {
                                const itemsWithPlaceholders = [
                                    ...data.items,
                                    ...Array(7 - data.items.length).fill({ item: 'No meal' })
                                ].slice(0, 7); // Ensure exactly 7 items

                                return (
                                    <tr key={data.id} className="text-[#5A5C5F] font-merriweather">
                                        <td className="bg-[#FCBD66] px-4 py-5 border border-[#FCBD66]">
                                            {data.date}
                                        </td>
                                        {itemsWithPlaceholders.map((item, index) => (
                                            <td
                                                key={index}
                                                className="border-r border-t border-b border-[#8993A4] px-4 py-5"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <p>{item.item}</p>
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <ThreeDotSvg />
                                                        </PopoverTrigger>
                                                        <PopoverContent className='w-28 text-center space-y-2'>
                                                            <button><Link to='/meal-planner'>Add meal</Link></button>
                                                            <button>Delete</button>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                            :
                            'No data found'
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MealPlanner;