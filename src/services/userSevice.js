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

// Đăng nhập, lấy dữ liệu khách hàng theo username và password
export const login = async (username, password) => {
    try {
        // Gửi request với params để không phải nối chuỗi thủ công
        const result = await get("userManagement", { username, password });
        return result;
    } catch (error) {
        console.error("Login error:", error);
        return [];
    }
};
export const getRoles = async () => {
    const result = await get("roles");
    return result;
};
