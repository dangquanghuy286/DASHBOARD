import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8088/api/v1/", // Địa chỉ API gốc
    timeout: 10000, // Thêm timeout để tránh treo request
    headers: {
        "Content-Type": "application/json", // Đảm bảo gửi dữ liệu JSON
    },
});

// Interceptor để xử lý phản hồi
instance.interceptors.response.use(
    function (response) {
        return response.data; // Trả về dữ liệu thực tế từ API
    },
    function (error) {
        // Xử lý lỗi chi tiết hơn
        if (error.response) {
            // Lỗi từ server (status code không nằm trong khoảng 2xx)
            console.error("API Error:", error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Không nhận được phản hồi từ server
            console.error("No response from server:", error.request);
            return Promise.reject({ message: "Không nhận được phản hồi từ server" });
        } else {
            // Lỗi khác
            console.error("Error:", error.message);
            return Promise.reject({ message: error.message });
        }
    },
);

export default instance;
