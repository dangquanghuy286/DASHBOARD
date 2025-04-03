import { edit, get, post } from "../util/request";

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
