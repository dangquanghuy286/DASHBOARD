import { useEffect, useState, useCallback } from "react";
import { getDashboardData, getDashboardDataByDateRange } from "../../services/dashboardService";
import ErrorMessage from "../ErrorMessage";
import DashboardHeader from "./DashBoardHeader";
import DashboardFilters from "./DashBoardFilter";
import LoadingSpinner from "../LoadingSniper";
import StatsDisplay from "./StatsDisplay";

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

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getDashboardData();

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

        if (newStartDate && endDate) {
            fetchDataByDateRange(newStartDate, endDate);
        }
    };

    // Xử lý khi chọn ngày kết thúc
    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
        setSelectedYear("");

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
        return <LoadingSpinner />;
    }

    // Hiển thị error state
    if (error && !dashboardSummary) {
        return <ErrorMessage error={error} />;
    }

    return (
        <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900">
                <DashboardHeader />
                <DashboardFilters
                    years={years}
                    selectedYear={selectedYear}
                    startDate={startDate}
                    endDate={endDate}
                    loading={loading}
                    handleYearChange={handleYearChange}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    handleResetFilters={handleResetFilters}
                />
            </div>

            {error && dashboardSummary && (
                <ErrorMessage
                    error={error}
                    isWarning={true}
                />
            )}

            {loading && dashboardSummary && (
                <div className="flex items-center justify-center rounded-lg bg-white/80 p-4 dark:bg-slate-800/80">
                    <LoadingSpinner message="Đang cập nhật dữ liệu..." />
                </div>
            )}

            <StatsDisplay currentStats={currentStats} />
        </div>
    );
}

export default TotalAll;
