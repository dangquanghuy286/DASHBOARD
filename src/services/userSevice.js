import { del, edit, get, post } from "../util/request";

// Lấy danh sách khách hàng
export const getDataUser = async () => {
    return await get("userManagement");
};

// Lấy thông tin khách hàng theo ID
export const getDataUserById = async (id) => {
    return await get(`userManagement/${id}`);
};

// Tạo khách hàng mới
export const createDataUser = async (data) => {
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

export const getRoles = async () => {
    const result = await get("roles");
    return result;
};
