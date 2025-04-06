import { ThreeDotSvg } from '@/components/svg-container/SvgContainer';
import { useState } from 'react';
const allTabs = [
    {
        title: 'Breakfast',
    },
    {
        title: 'Lunch',
    },
    {
        title: 'Dinner',
    },
    {
        title: 'Appetizer',
    },
    {
        title: 'Beverages',
    },
    {
        title: 'Salad',
    },
    {
        title: 'Desserts',
    },
    {
        title: 'Snacks',
    },
];
const tableData = [
    {
        id: 1,
        date: '4/5/2025',
        itemOne: 'Egg (Veggie Omelet)',
        itemTwo: 'Avocado',
        itemThree: 'Sausage',
        itemFour: 'Greek Yogurt Parfait',
        itemFive: 'Flaxseed Porridge',
        itemSix: 'Cauliflower Cheddar Hash Browns',
        itemSeven: 'Cauliflower2 Cheddar Hash Browns',
    },
    {
        id: 2,
        date: '4/5/2025',
        itemOne: 'Egg (Veggie Omelet)',
        itemTwo: 'Avocado',
        itemThree: 'Sausage',
        itemFour: 'Greek Yogurt Parfait',
        itemFive: 'Flaxseed Porridge',
        itemSix: 'Cauliflower Cheddar Hash Browns',
        itemSeven: 'Cauliflower2 Cheddar Hash Browns',
    },
    {
        id: 3,
        date: '4/5/2025',
        itemOne: 'Egg (Veggie Omelet)',
        itemTwo: 'Avocado',
        itemThree: 'Sausage',
        itemFour: 'Greek Yogurt Parfait',
        itemFive: 'Flaxseed Porridge',
        itemSix: 'Cauliflower Cheddar Hash Browns',
        itemSeven: 'Cauliflower2 Cheddar Hash Browns',
    },
    {
        id: 4,
        date: '4/5/2025',
        itemOne: 'Egg (Veggie Omelet)',
        itemTwo: 'Avocado',
        itemThree: 'Sausage',
        itemFour: 'Greek Yogurt Parfait',
        itemFive: 'Flaxseed Porridge',
        itemSix: 'Cauliflower Cheddar Hash Browns',
        itemSeven: 'Cauliflower2 Cheddar Hash Browns',
    },
    {
        id: 5,
        date: '4/5/2025',
        itemOne: 'Egg (Veggie Omelet)',
        itemTwo: 'Avocado',
        itemThree: 'Sausage',
        itemFour: 'Greek Yogurt Parfait',
        itemFive: 'Flaxseed Porridge',
        itemSix: 'Cauliflower Cheddar Hash Browns',
        itemSeven: 'Cauliflower2 Cheddar Hash Browns',
    },
]

const DashboardMealPlanner = () => {
    const [activeTab, setActiveTab] = useState(allTabs[0]);

    return (
        <section className="p-5">
            <h3 className="mb-7 text-2xl text-[#E48E19] font-semibold font-merriweather">Customize your meal plan</h3>
            {/* tabs */}
            <div className="mb-10 w-full flex flex-wrap items-center xl:justify-between px-5 2xl:px-0 gap-1 md:gap-1">
                {allTabs?.map((tab) => (
                    <button
                        key={tab.title}
                        onClick={() => setActiveTab(tab)}
                        className={`lg:px-6 px-3 lg:py-3 py-2 rounded-full  font-medium  ${tab?.title === activeTab?.title
                            ? 'bg-[#3A3A3A] text-white'
                            : 'bg-transparent text-textColor'
                            }`}
                    >
                        {tab?.title}
                    </button>
                ))}
            </div>
            {/* Table */}
            <div className="p-5 bg-[#F6F7FB] rounded space-y-5">
                {/* header */}
                <div className="grid grid-cols-8 text-[#5A5C5F] text-lg text-center font-merriweather">
                    <div className="bg-[#FCBD66] py-3 px-5">
                        Weekly Days (January)
                    </div>
                    <div className="col-span-7 bg-[#B7E4C7] py-6 font-medium">
                        Food Menus
                    </div>
                </div>
                {/* body */}
                {
                    tableData.map(data => <div key={data.id} className="grid grid-cols-8 text-[#5A5C5F] font-merriweather min-h-[80px]">
                        <div className="border-r border-t border-b flex items-center px-4 py-4 bg-[#FCBD66]">{data.date}</div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemOne}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemTwo}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemThree}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemFour}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemFive}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemSix}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                        <div className="border-r border-t border-b flex items-center justify-between px-4 py-4 border-[#8993A4]">
                            <p>{data.itemSeven}</p>
                            <button><ThreeDotSvg /></button>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};
export default DashboardMealPlanner;
