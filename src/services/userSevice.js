import { del, edit, get, post } from "../util/requestserver";

// Lấy danh sách khách hàng
export const getDataUser = async () => {
    try {
        const response = await get("users");
        console.log("Dữ liệu người dùng:", response);
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        throw error;
    }
};

// Lấy thông tin khách hàng theo ID
export const getDataUserById = async (id) => {
    return await get(`users/${id}`);
};

// Tạo khách hàng mới
export const createDataUser = async (data) => {
    return await post("users", data);
};

// Cập nhật thông tin khách hàng
export const editUser = async (id, option) => {
    return await edit(`users/${id}`, option);
};

// Xóa khách hàng theo ID
export const deleteUser = async (id) => {
    return await del(`users/${id}`);
};
