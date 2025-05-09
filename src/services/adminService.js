import { edit, get, post } from "../util/requestserver";

// Đăng nhập ADMIN
export const login = async (user_name, password) => {
    try {
        return await post("users/login", { user_name, password });
    } catch (error) {
        console.error("Lỗi khi đăng nhập ADMIN:", error);
        throw error;
    }
};
// Lấy thông tin ADMIN
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
        // Kiểm tra dữ liệu trước khi gửi
        if (!id || !data.current_password || !data.password) {
            return {
                status: 400,
                data: "Missing required fields: id, current_password, or password",
            };
        }

        const response = await edit(`users/${id}`, data);
        console.log("Raw response from server (putChangeInfoAdmin):", response);

        // Kiểm tra nội dung phản hồi
        if (response.status === 200) {
            // Đảm bảo server trả về thông báo thành công
            if (typeof response.data === "string" && response.data.toLowerCase().includes("success")) {
                return {
                    status: 200,
                    data: response.data,
                };
            } else {
                // Nếu server trả về 200 nhưng có lỗi (như "User not found")
                return {
                    status: 400,
                    data: response.data || "Failed to update password",
                };
            }
        } else {
            // Trả về mã trạng thái và thông báo từ server
            return {
                status: response.status,
                data: response.data || "Unexpected response from server",
            };
        }
    } catch (error) {
        console.error("Lỗi API trong putChangeInfoAdmin:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
        });

        // Trả về thông báo lỗi chi tiết từ server nếu có
        if (error.response) {
            return {
                status: error.response.status,
                data: error.response.data?.message || error.response.data || "Error from server",
            };
        }

        // Lỗi mạng hoặc không có phản hồi
        return {
            status: 500,
            data: error.message === "Network Error" ? "Network error: Unable to connect to server" : "Something went wrong",
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
