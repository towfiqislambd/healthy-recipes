import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <section className="mt-[114px] flex bg-white min-h-screen max-h-screen">
            {/* Dashboard Sidebar */}
            <div className="w-[237px] bg-[#F6F7FB]">
                Sidebar
            </div>
            {/* Dashboard Content  */}
            <div className="p-5  w-[calc(100%-237px)]">
                <Outlet />
                outlet
            </div>
        </section>
    );
};

export default Dashboard;