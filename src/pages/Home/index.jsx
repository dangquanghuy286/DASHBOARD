import icons from "../../util/icon";
import { AreaChart, ResponsiveContainer } from "recharts";
const { GoPackage, MdTrendingUp, MdOnlinePrediction, MdDoNotDisturbOnTotalSilence, FaUsers, FaMap, FaMapMarkedAlt, FaFire, FaRocket, FaChartBar } =
    icons;
function Home() {
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Trang chủ</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <MdOnlinePrediction size={26} />
                        </div>
                        <p className="card-title">Tour đang hoạt dộng</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">26.154</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <MdTrendingUp size={20} />
                            <span>25 %</span>
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <MdDoNotDisturbOnTotalSilence size={26} />
                        </div>
                        <p className="card-title">Tổng số lượt booking</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">26.154</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <MdTrendingUp size={20} />
                            <span>25 %</span>
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaUsers size={26} />
                        </div>
                        <p className="card-title">Tổng số người đăng ký</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">26.154</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <MdTrendingUp size={20} />
                            <span>25 %</span>
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <GoPackage size={26} />
                        </div>
                        <p className="card-title">Tổng doanh thu</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-red-400 transition-colors dark:text-red-400">26.154 VNĐ</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <MdTrendingUp size={20} />
                            <span>25 %</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                <div className="card col-span-1 md:col-span-2 lg:col-span-5">
                    <div className="card-header flex">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaMap size={26} />
                        </div>
                        <p className="card-title">Điểm đến</p>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header flex">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaMapMarkedAlt size={26} />
                        </div>
                        <p className="card-title">Đặt Tour</p>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header flex">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaFire size={26} />
                        </div>
                        <p className="card-title">Tour được đăt nhiều nhất</p>
                    </div>
                    <div className="card-body p-0"></div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header flex">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaRocket size={26} />
                        </div>
                        <p className="card-title">Tour mới</p>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-8">
                    <div className="card-header flex">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaChartBar size={26} />
                        </div>
                        <p className="card-title">Doanh thu theo tháng</p>
                    </div>
                    <div className="card-body p-0">
                        <ResponsiveContainer>
                            <AreaChart></AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
