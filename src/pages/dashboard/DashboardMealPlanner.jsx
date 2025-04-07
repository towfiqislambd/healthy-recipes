import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';

const allTabs = [
    { title: 'Breakfast' },
    { title: 'Lunch' },
    { title: 'Dinner' },
    { title: 'Appetizer' },
    { title: 'Beverages' },
    { title: 'Salad' },
    { title: 'Desserts' },
    { title: 'Snacks' },
];

const tableData = [
    {
        id: 1,
        date: '4/5/2025',
        items: [
            { id: 1, item: 'Egg (Veggie Omelet)' },
            { id: 2, item: 'Avocado' },
            { id: 3, item: 'Sausage' },
        ]
    },
    {
        id: 2,
        date: '5/5/2025',
        items: [
            { id: 1, item: 'Egg (Veggie Omelet)' },
            { id: 2, item: 'Avocado' },
            { id: 3, item: 'Sausage' },
            { id: 4, item: 'Egg (Veggie Omelet)' },
            { id: 5, item: 'Egg (Veggie Omelet)' },
        ]
    },
    {
        id: 3,
        date: '6/5/2025',
        items: [
            { id: 1, item: 'Egg (Veggie Omelet)' },
        ]
    },
];

const DashboardMealPlanner = () => {
    const [activeTab, setActiveTab] = useState(allTabs[0]);

    return (
        <section className="p-5">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">
                Customize your meal plan
            </h3>

            {/* Tabs */}
            <div className="mb-10 w-full flex flex-wrap items-center xl:justify-between px-5 2xl:px-0 gap-1 md:gap-1">
                {allTabs.map((tab) => (
                    <button
                        key={tab.title}
                        onClick={() => setActiveTab(tab)}
                        className={`lg:px-6 px-3 lg:py-3 py-2 rounded-full font-medium ${tab.title === activeTab.title
                            ? 'bg-[#3A3A3A] text-white'
                            : 'bg-transparent text-textColor'
                            }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

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
                    {tableData.map((data) => {
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
                                            {item.item !== 'No meal' && (
                                                <button>
                                                    <ThreeDotSvg />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default DashboardMealPlanner;
