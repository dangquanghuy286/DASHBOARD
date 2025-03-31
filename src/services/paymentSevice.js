import { get } from "../util/request";

export const getDataPayment = async () => {
    const result = await get("booking_payments");
    return result;
};
