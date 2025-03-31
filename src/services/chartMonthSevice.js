import { get } from "../util/request";

export const getDataMonths = async () => {
    const result = await get("monthlyRevenue");
    return result;
};
