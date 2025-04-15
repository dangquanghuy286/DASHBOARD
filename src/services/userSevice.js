import instance from "../util/requestserver";
import { del, edit, get, post } from "../util/request";

// Lấy danh sách khách hàng
export const getDataCustomer = async () => {
    return await get("userManagement");
};

// Lấy thông tin khách hàng theo ID
export const getDataCustomerById = async (id) => {
    return await get(`userManagement/${id}`);
};

// Tạo khách hàng mới
export const createDataCustomer = async (data) => {
    return await post("userManagement", data);
};

// Cập nhật thông tin khách hàng
export const editUser = async (id, option) => {
    return await edit(`userManagement/${id}`, option);
};

// Xóa khách hàng theo ID
export const deleteUser = async (id) => {
    return await del(`userManagement/${id}`);
};

export const loginApi = async (user_name, password) => {
    try {
        // Gửi yêu cầu đăng nhập
        return await instance.post("users/login", { user_name, password });
    } catch (error) {
        console.error("Login API error:", error);

        // Xử lý lỗi chi tiết
        if (error.response) {
            // Lỗi từ server
            throw error.response.data;
        } else if (error.request) {
            // Không nhận được phản hồi từ server
            throw { message: "Không nhận được phản hồi từ server" };
        } else {
            // Lỗi khác
            throw { message: error.message || "Đã xảy ra lỗi không xác định" };
        }
    }
};
// // API đăng nhập
// export const loginApi = async (user_name, password) => {
//     try {
//         return await instance.post("users/login", { user_name, password });
//     } catch (error) {
//         console.error("Login API error:", error);

//         if (error.response) {
//             // Lỗi phản hồi từ server
//             throw error.response.data;
//         } else if (error.request) {
//             // Không nhận được phản hồi từ server
//             throw { message: "Không thể kết nối đến server. Vui lòng thử lại sau." };
//         } else {
//             // Lỗi khác
//             throw { message: error.message || "Đã xảy ra lỗi không xác định." };
//         }
//     }
// };
export const getRoles = async () => {
    const result = await get("roles");
    return result;
};
