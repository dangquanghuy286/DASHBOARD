import { get } from "../util/request";

export const getDataBookingTour = async () => {
    const result = await get("bookingManagement");
    return result;
};
