import { get } from "../util/request";

export const getTopBooked = async () => {
    const result = await get("top_booked_tours");
    return result;
};
