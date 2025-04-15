import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/userSevice";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { validateInputs } from "../../components/Login/valiInput";
import LoginForm from "../../components/Login/LoginForm";

// Hàm xử lý submit được giữ trong component chính
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Kiểm tra token khi component được mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (user_name, password) => {
        const newErrors = validateInputs(user_name, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
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
                localStorage.setItem("token", res);
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
                    navigate("/", { replace: true });
                });
            } else {
                throw new Error("Phản hồi từ server không hợp lệ.");
            }
        } catch (error) {
            console.error("Login error:", error);
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
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-950 p-8 shadow-xl backdrop-blur-lg">
                <LoginForm
                    onSubmit={handleSubmit}
                    errors={errors}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default Login;
