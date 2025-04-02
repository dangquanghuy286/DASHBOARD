import { get } from "../util/request";

export const getDataCustomer = async () => {
    const result = await get("userManagement");
    return result;
};
