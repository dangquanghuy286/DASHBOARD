import { get, post, put, del } from "../util/requestserver";

export const getDataGuide = async () => {
    try {
        const response = await get("guides");
        return response.data;
    } catch (error) {
        console.error("Error fetching guide data:", error);
        return null;
    }
};

export const createGuide = async (guideData) => {
    try {
        const response = await post("guides", guideData);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Error creating guide:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi tạo hướng dẫn viên",
        };
    }
};

export const uploadGuidePhoto = async (guideId, photo) => {
    try {
        const formData = new FormData();
        formData.append("photo", photo);
        const response = await put(`guides/${guideId}/photo`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Error uploading photo for guide ID ${guideId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi upload ảnh hướng dẫn viên",
        };
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
        console.error(`Error deleting guide with ID ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi khi xóa hướng dẫn viên",
        };
    }
};
