import { get } from "../util/requestserver";

// Booking
export const getDataBookingTour = async (page, limit = 10, keyword = "") => {
    try {
        const res = await get("bookings", {
            params: { page: page - 1, limit, keyword }, // Backend dùng page từ 0
        });

        if (res.status !== 200) {
            throw new Error("Lỗi phản hồi từ server");
        }

        return {
            status: res.status,
            data: res.data.content || [], // Dữ liệu booking nằm trong content
            totalItems: res.data.totalElements || 0, // Tổng số bản ghi
            totalPages: res.data.totalPages || 1, // Tổng số trang
        };
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return {
            status: error.response?.status || 500,
            data: [],
            totalItems: 0,
            totalPages: 1,
            message: error.message || "Lỗi khi lấy danh sách booking",
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
