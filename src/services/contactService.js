import { edit, get, del } from "../util/requestserver";

export const getContact = async () => {
    const result = await get("contact");
    return result;
};

export const editContact = async (id, contactData) => {
    const result = await edit(`contact/${id}`, contactData);
    return result;
};

export const deleteContact = async (id) => {
    const result = await del(`contact/${id}`);
    return result;
};
