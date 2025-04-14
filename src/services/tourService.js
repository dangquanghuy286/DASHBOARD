// src/services/tourService.js
import { del, edit, get, post } from "../util/request";

// Lấy tất cả tour
export const getDataTour = async () => {
    return await get("tourManagement");
};

// Tạo tour mới
export const createDataTour = async (data) => {
    return await post("tourManagement", data);
};

// Xóa tour theo ID
export const deleteTour = async (id) => {
    return await del(`tourManagement/${id}`);
};

// Cập nhật tour
export const updateTour = async (id, data) => {
    return await edit(`tourManagement/${id}`, data);
};

// Lấy danh sách khu vực
export const getDataRegion = async () => {
    return await get("regions");
};
