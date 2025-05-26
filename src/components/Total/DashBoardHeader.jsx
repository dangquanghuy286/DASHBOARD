import icons from "../../util/icon";
const { FaChartLine } = icons;
function DashboardHeader() {
    return (
        <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-[#019fb5] transition-colors hover:bg-blue-500/30 dark:bg-blue-600/20 dark:text-[#019fb5] dark:hover:bg-blue-600/30">
                <FaChartLine size={24} />
            </div>
            <p className="card-title text-xl font-semibold text-gray-800 dark:text-white">Thống kê</p>
        </div>
    );
}

export default DashboardHeader;
