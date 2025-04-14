import { get } from "../util/request";

export const getDataBookingTour = async () => {
    const result = await get("bookingManagement");
    return result;
};
export const getDataBookingTourById = async (id) => {
    const result = await get(`bookingManagement/${id}`);
    return result;
};
export const getDataPayment = async () => {
    const result = await get("booking_payments");
    return result;
};
