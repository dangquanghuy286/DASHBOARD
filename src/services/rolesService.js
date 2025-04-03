import { get } from "../util/request";

export const getRoles = async () => {
    const result = await get("roles");
    return result;
};
