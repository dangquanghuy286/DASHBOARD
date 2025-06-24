import { post, put } from "../util/requestserver";

export const createBlog = async (data) => {
    try {
        const res = await post("blogs", data);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error("Tạo blogs thất bại !");
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi tạo blogs",
        };
    }
};
export const uploadBlogImage = async (blogId, photo) => {
    try {
        const formData = new FormData();
        formData.append("image", photo);
        const response = await put(`blogs/${blogId}/image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Error uploading image for blog ID ${blogId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Lỗi upload ảnh blog",
        };
    }
};
