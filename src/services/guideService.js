import { get } from "../util/requestserver";

export const getDataGuide = async () => {
    try {
        const response = await get("guides");
        return response.data;
    } catch (error) {
        console.error("Error fetching guide data:", error);
        return null;
    }
};
