import { get } from "../util/requestserver";

export const getDataBookingTour = async (page, limit = 10000, keyword = "") => {
    try {
        const res = await get("bookings", {
            params: { page, limit, keyword },
        });

        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy danh sách booking",
        };
    }
};
// Lấy thông tin booking theo ID
export const getDataBookingTourById = async (id) => {
    try {
        const res = await get(`bookings/${id}`);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin booking với ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi lấy thông tin booking",
        };
    }
};
