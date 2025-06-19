import { del, get } from "../util/requestserver";

export const getDataGuide = async () => {
    try {
        const response = await get("guides");
        return response.data;
    } catch (error) {
        console.error("Error fetching guide data:", error);
        return null;
    }
};
export const deleteGuide = async (id) => {
    try {
        const response = await del(`guides/${id}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Error deleting tour with ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi xóa Guides",
        };
    }
};
