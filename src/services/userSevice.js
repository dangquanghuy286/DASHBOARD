import { del, edit, get, post } from "../util/request";

export const getDataCustomer = async () => {
    const result = await get("userManagement");
    return result;
};
export const createDataCustomer = async (data) => {
    const result = await post("userManagement", data);
    return result;
};
export const editUser = async (id, option) => {
    const result = await edit(`userManagement/${id}`, option);
    return result;
};
export const deleteUser = async (id) => {
    const result = await del(`userManagement/${id}`);
    return result;
};
export const login = async (user, password) => {
    const result = await get(`userManagement?username=${user}&password=${password}`);
    return result;
};
