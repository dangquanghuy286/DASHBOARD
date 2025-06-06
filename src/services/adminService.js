import { edit, get, post } from "../util/requestserver";

// Đăng nhập ADMIN
export const login = async (user_name, password) => {
    try {
        if (!user_name || !password) {
            throw new Error("Username and password are required");
        }

        const response = await post("users/login", { user_name, password });

        if (!response?.data) {
            throw new Error("Invalid response from server");
        }

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        // Nếu có response từ backend, ném nguyên response để phía Login xử lý
        if (error.response?.data) {
            throw {
                status: error.response.status,
                data: error.response.data,
            };
        }

        // Còn lại thì ném lỗi mặc định
        throw {
            status: 500,
            data: {
                errorCode: "UNKNOWN_ERROR",
                message: error.message || "Login failed",
            },
        };
    }
};

// Get admin information
export const getInfoAdmin = async (id) => {
    try {
        const response = await get(`users/${id}`);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Something went wrong",
        };
    }
};
//Sửa thông tin ADMIN
export const putChangeInfoAdmin = async (id, data) => {
    try {
        const response = await edit(`users/${id}`, data);

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Lỗi khi gọi API:", error.response?.data);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Something went wrong",
        };
    }
};

//Thay đổi ảnh Admin
export const putProfileImg = async (id, formData) => {
    try {
        const response = await edit(`users/${id}/avatar`, formData);
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(`Lỗi khi cập nhật ảnh đại diện cho user ${id}:`, error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || "Đã xảy ra lỗi khi tải ảnh lên",
        };
    }
};
