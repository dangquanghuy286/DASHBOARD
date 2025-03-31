import { get } from "../util/request";

export const getTourRecent = async () => {
    const result = await get("recent_bookings");
    return result;
};
