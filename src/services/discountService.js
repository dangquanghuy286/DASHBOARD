import { del, get, post } from "../util/requestserver";

export const getDataDiscount = async () => {
    try {
        const response = await get("promotions");
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Lỗi!", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi lấy dữ liệu ",
        };
    }
};
export const deleteDiscount = async (promotionId) => {
    try {
        const response = await del(`promotions/${promotionId}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Error deleting discount with ID ${promotionId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Lỗi khi xóa mã giảm giá" },
        };
    }
};
export const createDiscount = async (data) => {
    try {
        const response = await post("promotions", data);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Lỗi", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi tạo mã giảm giá!",
        };
    }
};
