import { del, get, post, put } from "../util/requestserver";

export const getDataBlog = async () => {
    try {
        const response = await get("blogs");
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs data:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi lấy blogs",
        };
    }
};

export const getBlogById = async (blogId) => {
    try {
        const response = await get(`blogs/${blogId}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Error fetching blog ID ${blogId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi lấy thông tin blog",
        };
    }
};

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

export const updateBlog = async (blogId, data) => {
    try {
        const res = await put(`blogs/${blogId}`, data);
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.error(`Cập nhật blog ID ${blogId} thất bại !`);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi cập nhật blog",
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
export const deleteBlog = async (blogId) => {
    try {
        const response = await del(`blogs/${blogId}`);
        return {
            status: response.status,
            data: response.data || { message: "Xóa bài viết thành công" },
        };
    } catch (error) {
        console.error(`Error deleting blog ID ${blogId}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi xóa bài viết",
        };
    }
};
