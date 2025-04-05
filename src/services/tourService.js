import { get } from "../util/request";

export const getDataTour = async () => {
    const result = await get("tourManagement");
    return result;
};
