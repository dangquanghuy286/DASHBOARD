import { get, post } from "../util/request";

export const getDataCustomer = async () => {
    const result = await get("userManagement");
    return result;
};
export const createDataCustomer = async (data) => {
    const result = await post("userManagement", data);
    return result;
};
