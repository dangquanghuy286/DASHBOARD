import { del, get } from "../util/requestserver";

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
