import { get } from "../util/request";

export const getTourStatistics = async () => {
    const result = await get("destination_statistics");
    return result;
};
