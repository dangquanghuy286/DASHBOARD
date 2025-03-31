import { get } from "../util/request";

export const getDashboardData = async () => {
    const result = await get("dashboard_summary");
    return result;
};
