import { get } from "../util/requestserver";

export const getTourStatistics = async () => {
    const result = await get("destination_statistics");
    return result;
};
export const getTourRecent = async () => {
    const result = await get("recent_bookings");
    return result;
};
export const getTopBooked = async () => {
    const result = await get("top_booked_tours");
    return result;
};

export const getDashboardData = async () => {
    try {
        const res = await get("dashboard");
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy dữ liệu dashboard",
        };
    }
};
export const getDataMonths = async () => {
    const result = await get("monthlyRevenue");
    return result;
};
export const getDataPayment = async () => {
    const result = await get("booking_payments");
    return result;
};
