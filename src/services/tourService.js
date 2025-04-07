import { del, get, post } from "../util/request";

export const getDataTour = async () => {
    const result = await get("tourManagement");
    return result;
};
export const createDataTour = async (data) => {
    const result = await post("tourManagement", data);
    return result;
};
export const deleteTour = async (id) => {
    const result = await del(`tourManagement/${id}`);
    return result;
};
export const updateTour = async (id, data) => {
    const result = await post(`tourManagement/${id}`, data);
    return result;
};
