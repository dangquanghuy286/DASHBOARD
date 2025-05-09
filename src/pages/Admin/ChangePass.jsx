import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { putChangeInfoAdmin, getInfoAdmin } from "../../services/adminService";
import GoBack from "../../components/GoBack/Goback";
import InputPassword from "../../components/InputPass";

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [userId, setUserId] = useState(null); // Sử dụng userId từ localStorage
    const [isLoading, setIsLoading] = useState(true); // Trạng thái tải
    const navigate = useNavigate();

    useEffect(() => {
        const userIdToCheck = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        // Kiểm tra token và userId
        if (!token) {
            Swal.fire("Lỗi", "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.", "error").then(() => {
                navigate("/login");
            });
            return;
        }
        if (!userIdToCheck) {
            Swal.fire("Lỗi", "Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.", "error").then(() => {
                navigate("/login");
            });
            return;
        }

        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const res = await getInfoAdmin(userIdToCheck);
                console.log("Phản hồi từ getInfoAdmin:", res); // Debug API response
                if (res.status === 200) {
                    setUserId(userIdToCheck); // Sử dụng userIdToCheck nếu API thành công
                } else {
                    Swal.fire("Lỗi", "Không tìm thấy người dùng hợp lệ", "error");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin admin:", error);
                const errorMessage =
                    error.response?.data?.message ||
                    (error.message === "Network Error" ? "Lỗi kết nối server" : "Không thể lấy thông tin người dùng");
                Swal.fire("Lỗi", errorMessage, "error");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng nhập
    };

    const validateForm = ({ currentPassword, newPassword, confirmPassword }) => {
        const newErrors = {};
        if (!currentPassword) newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
        else if (currentPassword.length < 6) newErrors.currentPassword = "Mật khẩu phải có ít nhất 6 ký tự";
        if (!newPassword) newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
        else if (newPassword.length < 6) newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
        if (!confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
        else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Mật khẩu mới và xác nhận không khớp";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = formData;

        // Kiểm tra form
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Swal.fire("Lỗi", Object.values(newErrors)[0], "error");
            return;
        }

        // Kiểm tra userId
        if (!userId) {
            Swal.fire("Lỗi", "Không tìm thấy thông tin người dùng. Vui lòng thử lại.", "error");
            return;
        }

        try {
            const updatedData = {
                current_password: currentPassword,
                password: newPassword,
            };

            console.log("Dữ liệu gửi đi:", updatedData);
            console.log("User ID gửi đi:", userId);

            const response = await putChangeInfoAdmin(userId, updatedData);
            console.log("Phản hồi từ putChangeInfoAdmin:", response);

            // Kiểm tra nội dung phản hồi thay vì chỉ dựa vào status
            if (response.status === 200 && typeof response.data === "string" && response.data.toLowerCase().includes("success")) {
                Swal.fire("Thành công", "Mật khẩu đã được thay đổi", "success").then(() => {
                    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    navigate("/admin");
                });
            } else {
                // Nếu server trả về lỗi (như "User not found"), hiển thị thông báo lỗi
                const errorMessage = response.data?.message || response.data || "Không thể thay đổi mật khẩu";
                Swal.fire("Lỗi", errorMessage, "error");
            }
        } catch (error) {
            console.error("Lỗi khi thay đổi mật khẩu:", error);
            const errorMessage =
                error.response?.data?.message ||
                (error.message === "Network Error" ? "Lỗi kết nối server. Vui lòng kiểm tra lại mạng hoặc server." : "Không thể thay đổi mật khẩu");
            Swal.fire("Lỗi", errorMessage, "error");
        }
    };

    // Hiển thị giao diện tải
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
                <p>Đang tải thông tin...</p>
            </div>
        );
    }

    // Hiển thị lỗi nếu không có userId
    if (!userId) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
                <p>Không thể tải thông tin người dùng. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-950 dark:text-white">MẬT KHẨU</h1>
            </div>
            <div className="mx-auto mt-10 max-w-md rounded-xl bg-slate-50 p-6 shadow-xl shadow-gray-500/30 dark:bg-slate-900">
                <h2 className="mb-4 text-center text-2xl font-semibold text-[#019fb5] dark:text-slate-50">Đổi Mật Khẩu</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Mật khẩu hiện tại</label>
                        <InputPassword
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            error={errors.currentPassword}
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                        {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Mật khẩu mới</label>
                        <InputPassword
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                            placeholder="Nhập mật khẩu mới"
                        />
                        {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Xác nhận mật khẩu mới</label>
                        <InputPassword
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            placeholder="Xác nhận mật khẩu mới"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <GoBack className="ml-2 text-gray-500 hover:text-gray-700" />
                        <button
                            type="submit"
                            className="rounded-md bg-gradient-to-r from-[#019fb5] to-[#00c0d1] px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:from-[#018a9f] hover:to-[#00a8bb]"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
