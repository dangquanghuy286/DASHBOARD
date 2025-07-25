/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import icons from "../../util/icon";
import InputPassword from "../../components/InputPass";
import { login } from "../../services/adminService";

const { FaUserAlt } = icons;

function Login() {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [user_name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validate = (user_name, password) => {
        const newErrors = {};
        if (!user_name) newErrors.user_name = "Vui lòng nhập tên đăng nhập";
        else if (!/^[a-zA-Z0-9_]+$/.test(user_name)) {
            newErrors.user_name = "Tên đăng nhập chỉ chứa chữ, số hoặc dấu _";
        }
        if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate(user_name, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Thiếu thông tin",
                text: Object.values(newErrors)[0],
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
            return;
        }

        try {
            setLoading(true);
            const res = await login(user_name, password);
            if (res.data?.token) {
                // Kiểm tra role_id
                if (res.data?.role_id === 1) {
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Đăng nhập thất bại",
                        text: "Tài khoản của bạn không có quyền đăng nhập.",
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: "top-end",
                    });
                    return;
                }
                if (res.data?.role_id === 2) {
                    setLoading(false);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user_id", res.data.user_id);
                    localStorage.setItem("role_id", res.data.role_id);

                    Swal.fire({
                        icon: "success",
                        title: "Đăng nhập thành công!",
                        showConfirmButton: false,
                        timer: 1500,
                        position: "top-end",
                    });
                    setTimeout(() => navigate("/"), 1600);
                }
            } else {
                throw new Error("No token received");
            }
        } catch (error) {
            setLoading(false);
            let errorMessage = "Đã xảy ra lỗi không xác định";
            let errorTitle = "Đăng nhập thất bại";

            if (error.data?.errorCode) {
                const { errorCode, message } = error.data;

                switch (errorCode) {
                    case "DATA_NOT_FOUND":
                        errorMessage = "Tên đăng nhập không tồn tại";
                        break;
                    case "INVALID_PASSWORD":
                        errorMessage = "Mật khẩu không đúng";
                        break;
                    case "ACCOUNT_BLOCKED":
                        errorMessage = "Tài khoản đã bị chặn. Vui lòng liên hệ quản trị viên.";
                        break;
                    case "ACCOUNT_NOT_ACTIVATED":
                        errorMessage = "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt.";
                        break;
                    case "INVALID_PARAM":
                        errorMessage = message || "Thông tin đăng nhập không hợp lệ";
                        break;
                    case "UNKNOWN_ERROR":
                    default:
                        errorMessage = message || "Đã xảy ra lỗi không xác định";
                        break;
                }
            }

            Swal.fire({
                icon: "error",
                title: errorTitle,
                text: errorMessage,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/");
    }, [navigate]);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md rounded-lg bg-slate-950 p-8 shadow-2xl shadow-gray-500/30 backdrop-blur-md">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <h1 className="text-center text-3xl font-bold text-[#019fb5]">ĐĂNG NHẬP</h1>

                    <div className="relative">
                        <input
                            type="text"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Tên đăng nhập"
                            className={`h-12 w-full rounded-full border-2 ${
                                errors.user_name ? "border-red-500" : "border-[#019fb5]"
                            } bg-transparent px-5 pr-12 text-lg text-white placeholder-[#019fb5] focus:outline-none`}
                        />
                        <FaUserAlt className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5]" />
                        {errors.user_name && <p className="mt-1 text-sm text-red-500">{errors.user_name}</p>}
                    </div>

                    <InputPassword
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-12 w-full cursor-pointer rounded-full font-semibold text-white transition duration-300 ${
                            loading ? "bg-gray-600" : "bg-[#019fb5] hover:bg-[#01484f]"
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
