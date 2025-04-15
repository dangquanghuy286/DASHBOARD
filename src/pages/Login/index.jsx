import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/userSevice"; // Đảm bảo đường dẫn đúng
import icons from "../../util/icon";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const { FaUserAlt, RiLockPasswordFill } = icons;

// Hàm kiểm tra dữ liệu đầu vào
const validateInputs = (user_name, password) => {
    const errors = {};
    if (!user_name) {
        errors.user_name = "Vui lòng nhập tên đăng nhập.";
    } else if (user_name.length < 3) {
        errors.user_name = "Tên đăng nhập phải dài ít nhất 3 ký tự.";
    }

    if (!password) {
        errors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
        errors.password = "Mật khẩu phải dài ít nhất 6 ký tự.";
    }

    return errors;
};

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Kiểm tra token khi component được mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Điều hướng ngay lập tức nếu đã có token
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_name = e.target.username.value.trim();
        const password = e.target.password.value.trim();

        // Kiểm tra dữ liệu đầu vào
        const newErrors = validateInputs(user_name, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            // Hiển thị một thông báo lỗi duy nhất
            const errorMessage = Object.values(newErrors).join(" ");
            Swal.fire({
                title: "Lỗi",
                text: errorMessage,
                icon: "warning",
                background: "#fff9c4",
                color: "#990000",
                confirmButtonColor: "#990000",
                position: "top-end",
                timer: 3000,
            });
            return;
        }

        try {
            setLoading(true);
            const res = await loginApi(user_name, password);

            if (res && typeof res === "string") {
                // Lưu token vào localStorage
                localStorage.setItem("token", res);

                // Hiển thị thông báo thành công
                Swal.fire({
                    title: "Thành công!",
                    text: "Đăng nhập thành công!",
                    icon: "success",
                    background: "#fff9c4",
                    color: "#4caf50",
                    confirmButtonColor: "#4caf50",
                    position: "top-end",
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    // Điều hướng sau khi thông báo đóng
                    navigate("/", { replace: true });
                });
            } else {
                throw new Error("Phản hồi từ server không hợp lệ.");
            }
        } catch (error) {
            console.error("Login error:", error);

            // Hiển thị thông báo lỗi cụ thể
            Swal.fire({
                title: "Lỗi",
                text: error.message || "Đăng nhập thất bại, vui lòng thử lại!",
                icon: "error",
                background: "#fff9c4",
                color: "#990000",
                confirmButtonColor: "#990000",
                position: "top-end",
                timer: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-slate-900 bg-cover bg-center bg-no-repeat p-4">
            <div className="w-full max-w-md rounded-lg bg-slate-950 p-8 shadow-2xl backdrop-blur-md">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-center text-3xl font-bold text-[#0061ff]">ĐĂNG NHẬP</h1>

                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên đăng nhập"
                            className={`h-12 w-full rounded-full border-2 ${
                                errors.user_name ? "border-red-500" : "border-[#0061ff]"
                            } bg-transparent px-5 pr-12 text-lg text-white placeholder-[#0061ff] focus:ring-2 focus:ring-[#0061ff] focus:outline-none`}
                        />
                        <FaUserAlt className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#0061ff]" />
                        {errors.user_name && <p className="mt-1 text-sm text-red-500">{errors.user_name}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            className={`h-12 w-full rounded-full border-2 ${
                                errors.password ? "border-red-500" : "border-[#0061ff]"
                            } bg-transparent px-5 pr-12 text-lg text-white placeholder-[#0061ff] focus:ring-2 focus:ring-[#0061ff] focus:outline-none`}
                        />
                        <RiLockPasswordFill className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#0061ff]" />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-12 w-full rounded-full font-semibold text-white transition duration-300 ${
                            loading ? "cursor-not-allowed bg-gray-600" : "bg-[#0061ff] hover:bg-[#0051d6]"
                        }`}
                    >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
