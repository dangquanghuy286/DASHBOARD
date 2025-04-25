import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8088/api/v1/",
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Các hàm gọi API
export const get = (path) => instance.get(path);
export const post = (path, data) => instance.post(path, data);
export const del = (path) => instance.delete(path);
export const edit = (path, data) => instance.put(path, data);
export default instance;
