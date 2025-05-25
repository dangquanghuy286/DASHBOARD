import { useEffect, useState, useCallback } from "react";
import icons from "../../util/icon";
import Card from "../Card";
import { getDashboardData, getDashboardDataByDateRange } from "../../services/dashboardService";

const { GoPackage, MdOnlinePrediction, MdDoNotDisturbOnTotalSilence, FaUsers, IoMdRepeat, FaChartLine } = icons;

function TotalAll() {
    const [dashboardSummary, setDashboardSummary] = useState(null);
    const [currentStats, setCurrentStats] = useState({
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0,
        activeTours: 0,
    });
    const [selectedYear, setSelectedYear] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Tạo danh sách năm (5 năm trước đến năm hiện tại)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    // Fetch dữ liệu ban đầu
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getDashboardData();
                console.log(res);

                if (res.status === 200) {
                    setDashboardSummary(res.data);
                    setCurrentStats({
                        totalUsers: res.data.totalUsers || 0,
                        totalBookings: res.data.totalBookings || 0,
                        totalRevenue: res.data.totalRevenue || 0,
                        activeTours: res.data.activeTours || 0,
                    });
                } else {
                    throw new Error("Không thể lấy dữ liệu dashboard");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
                setError("Không thể tải dữ liệu. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Hàm fetch dữ liệu theo khoảng thời gian
    const fetchDataByDateRange = useCallback(
        async (start, end) => {
            try {
                setLoading(true);
                setError(null);

                const res = await getDashboardDataByDateRange(start, end);

                if (res.status === 200) {
                    setCurrentStats({
                        totalUsers: res.data.totalUsers || 0,
                        totalBookings: res.data.totalBookings || 0,
                        totalRevenue: res.data.totalRevenue || 0,
                        activeTours: res.data.activeTours || dashboardSummary?.activeTours || 0,
                    });
                } else {
                    throw new Error("Không thể lấy dữ liệu theo khoảng thời gian");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu theo khoảng thời gian:", error);
                setError("Không thể lấy dữ liệu theo khoảng thời gian đã chọn.");
            } finally {
                setLoading(false);
            }
        },
        [dashboardSummary],
    );

    // Xử lý khi chọn năm
    const handleYearChange = useCallback(
        async (e) => {
            const year = e.target.value;
            setSelectedYear(year);
            setStartDate("");
            setEndDate("");

            if (!year) {
                // Reset về dữ liệu ban đầu
                if (dashboardSummary) {
                    setCurrentStats({
                        totalUsers: dashboardSummary.totalUsers || 0,
                        totalBookings: dashboardSummary.totalBookings || 0,
                        totalRevenue: dashboardSummary.totalRevenue || 0,
                        activeTours: dashboardSummary.activeTours || 0,
                    });
                }
                return;
            }

            const startDateStr = `${year}-01-01`;
            const endDateStr = `${year}-12-31`;
            await fetchDataByDateRange(startDateStr, endDateStr);
        },
        [dashboardSummary, fetchDataByDateRange],
    );

    // Xử lý khi chọn ngày bắt đầu
    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        setSelectedYear("");

        // Nếu có cả start và end date thì fetch data
        if (newStartDate && endDate) {
            fetchDataByDateRange(newStartDate, endDate);
        }
    };

    // Xử lý khi chọn ngày kết thúc
    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        setSelectedYear("");

        // Nếu có cả start và end date thì fetch data
        if (startDate && newEndDate) {
            fetchDataByDateRange(startDate, newEndDate);
        }
    };

    // Hàm reset filters
    const handleResetFilters = useCallback(() => {
        setSelectedYear("");
        setStartDate("");
        setEndDate("");
        if (dashboardSummary) {
            setCurrentStats({
                totalUsers: dashboardSummary.totalUsers || 0,
                totalBookings: dashboardSummary.totalBookings || 0,
                totalRevenue: dashboardSummary.totalRevenue || 0,
                activeTours: dashboardSummary.activeTours || 0,
            });
        }
    }, [dashboardSummary]);

    // Hiển thị loading state
    if (!dashboardSummary && loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-gray-600 dark:text-gray-300">Đang tải dữ liệu...</span>
                </div>
            </div>
        );
    }

    // Hiển thị error state
    if (error && !dashboardSummary) {
        return (
            <div className="p-4">
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Lỗi tải dữ liệu</h3>
                            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header với filters */}
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900">
                <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-[#019fb5] transition-colors hover:bg-blue-500/30 dark:bg-blue-600/20 dark:text-[#019fb5] dark:hover:bg-blue-600/30">
                        <FaChartLine size={24} />
                    </div>
                    <p className="card-title text-xl font-semibold text-gray-800 dark:text-white">Thống kê </p>
                </div>

                <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center">
                        {/* Chọn năm */}
                        <div className="flex min-w-[240px] flex-1 flex-col">
                            <label className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Chọn năm</label>
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                disabled={loading}
                            >
                                <option value="">Tất cả thời gian</option>
                                {years.map((year) => (
                                    <option
                                        key={year}
                                        value={year}
                                        className="dark:bg-slate-800"
                                    >
                                        Năm {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Chọn khoảng ngày */}
                        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end">
                            <div className="flex w-full min-w-[240px] flex-col">
                                <label className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Từ ngày</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex w-full min-w-[240px] flex-col">
                                <label className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Đến ngày</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    min={startDate}
                                    className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Nút reset */}
                    {(selectedYear || startDate || endDate) && (
                        <div className="mt-4 flex min-w-[160px] justify-end sm:mt-0">
                            <button
                                onClick={handleResetFilters}
                                disabled={loading}
                                className="flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-3 text-base font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-800"
                            >
                                <IoMdRepeat className="transform text-lg transition-transform hover:rotate-90" />
                                <span>Đặt lại</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Hiển thị trạng thái filter */}
                {(selectedYear || (startDate && endDate)) && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                        <span>Đang hiển thị dữ liệu:</span>
                        {selectedYear && <span className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">Năm {selectedYear}</span>}
                        {startDate && endDate && (
                            <span className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">
                                {new Date(startDate).toLocaleDateString("vi-VN")} - {new Date(endDate).toLocaleDateString("vi-VN")}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Error state cho filter */}
            {error && dashboardSummary && (
                <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Cảnh báo</h3>
                            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading overlay cho filters */}
            {loading && dashboardSummary && (
                <div className="flex items-center justify-center rounded-lg bg-white/80 p-4 dark:bg-slate-800/80">
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                        <span className="text-gray-600 dark:text-gray-300">Đang cập nhật dữ liệu...</span>
                    </div>
                </div>
            )}

            {/* Hiển thị thống kê */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Active Tours */}
                <Card
                    icon={
                        <MdOnlinePrediction
                            size={26}
                            className="text-green-500"
                        />
                    }
                    title="Tour đang hoạt động"
                    value={currentStats.activeTours.toLocaleString()}
                    percentage="N/A"
                    className="transition-shadow hover:shadow-md"
                />

                {/* Users */}
                <Card
                    icon={
                        <FaUsers
                            size={26}
                            className="text-blue-500"
                        />
                    }
                    title="Tổng số người đăng ký"
                    value={currentStats.totalUsers.toLocaleString()}
                    percentage="N/A"
                    className="transition-shadow hover:shadow-md"
                />

                {/* Bookings */}
                <Card
                    icon={
                        <MdDoNotDisturbOnTotalSilence
                            size={26}
                            className="text-orange-500"
                        />
                    }
                    title="Tổng số lượt booking"
                    value={currentStats.totalBookings.toLocaleString()}
                    percentage="N/A"
                    className="transition-shadow hover:shadow-md"
                />

                {/* Revenue */}
                <Card
                    icon={
                        <GoPackage
                            size={26}
                            className="text-red-500"
                        />
                    }
                    title="Tổng doanh thu"
                    value={`${currentStats.totalRevenue.toLocaleString()} VNĐ`}
                    percentage="N/A"
                    valueClass="text-red-500 font-semibold"
                    className="transition-shadow hover:shadow-md"
                />
            </div>
        </div>
    );
}

export default TotalAll;
