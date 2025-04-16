// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginApi } from "../../services/userSevice";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
// import { validateInputs } from "../../components/Login/valiInput";
// import LoginForm from "../../components/Login/LoginForm";
// import { setCookie } from "../../helpers/cookie";

// // Hàm xử lý submit được giữ trong component chính
// function Login() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});

//     // Kiểm tra token khi component được mount
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             navigate("/", { replace: true });
//         }
//     }, [navigate]);

//     const handleSubmit = async (user_name, password) => {
//         const newErrors = validateInputs(user_name, password);
//         setErrors(newErrors);

//         if (Object.keys(newErrors).length > 0) {
//             const errorMessage = Object.values(newErrors).join(" ");
//             Swal.fire({
//                 title: "Lỗi",
//                 text: errorMessage,
//                 icon: "warning",
//                 background: "#fff9c4",
//                 color: "#990000",
//                 confirmButtonColor: "#990000",
//                 position: "top-end",
//                 timer: 3000,
//             });
//             return;
//         }

//         try {
//             setLoading(true);
//             const res = await loginApi(user_name, password);
//             console.log(res);

//             if (res && typeof res === "string") {
//                 localStorage.setItem("token", res);
//                 setCookie("token", res, 1);
//                 Swal.fire({
//                     title: "Thành công!",
//                     text: "Đăng nhập thành công!",
//                     icon: "success",
//                     background: "#fff9c4",
//                     color: "#4caf50",
//                     confirmButtonColor: "#4caf50",
//                     position: "top-end",
//                     timer: 2000,
//                     timerProgressBar: true,
//                 }).then(() => {
//                     navigate("/", { replace: true });
//                 });
//             } else {
//                 throw new Error("Phản hồi từ server không hợp lệ.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             Swal.fire({
//                 title: "Lỗi",
//                 text: error.message || "Đăng nhập thất bại, vui lòng thử lại!",
//                 icon: "error",
//                 background: "#fff9c4",
//                 color: "#990000",
//                 confirmButtonColor: "#990000",
//                 position: "top-end",
//                 timer: 3000,
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
//             <div className="w-full max-w-md rounded-2xl bg-slate-950 p-8 shadow-xl backdrop-blur-lg">
//                 <LoginForm
//                     onSubmit={handleSubmit}
//                     errors={errors}
//                     loading={loading}
//                 />
//             </div>
//         </div>
//     );
// }

// export default Login;

import { useNavigate } from "react-router-dom";
import { login } from "../../services/userSevice";
import icons from "../../util/icon";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

const { FaUserAlt, RiLockPasswordFill } = icons;
function Login() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        const res = await login(email, password);

        if (res.length > 0) {
            Swal.fire({
                title: "Thành công!",
                background: "#fff9c4",
                color: "#4caf50",
                confirmButtonColor: "#4caf50",
                icon: "success",
                draggable: true,
            });
            setCookie("userId", res[0].userId, 1);
            setCookie("name", res[0].name, 1);
            setCookie("email", res[0].email, 1);
            setCookie("phone", res[0].phone, 1);
            setCookie("avatar", res[0].avatar, 1);
            setCookie("address", res[0].address, 1);
            setCookie("role", res[0].role, 1);
            setCookie("username", res[0].username, 1);
            setCookie("token", res[0].token, 1);
            dispatch(checkLogin(true));
            nav("/");
        } else {
            Swal.fire({
                title: "Đăng nhập thất bại, hãy thử lại sau!",
                icon: "error",
                background: "#fff9c4",
                color: "#990000",
                confirmButtonColor: "#990000",
                customClass: {
                    popup: "custom-swal-popup",
                },
            });
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-slate-900 bg-cover bg-no-repeat">
            <div className="bg-opacity-50 w-[400px] rounded-lg bg-slate-950 p-5 shadow-lg">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-center text-2xl font-bold text-[#0061ff]">LOGIN</h1>

                    <div className="relative h-[50px] w-full">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="h-full w-full rounded-full border-2 border-[#0061ff] bg-transparent px-5 pr-12 text-lg text-white placeholder-[#0061ff] focus:outline-none"
                        />
                        <FaUserAlt className="absolute top-1/2 right-5 -translate-y-1/2 transform text-xl text-[#0061ff]" />
                    </div>

                    <div className="relative h-[50px] w-full">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="h-full w-full rounded-full border-2 border-[#0061ff] bg-transparent px-5 pr-12 text-lg text-white placeholder-[#0061ff] focus:outline-none"
                        />
                        <RiLockPasswordFill className="absolute top-1/2 right-5 -translate-y-1/2 transform text-xl text-[#0061ff]" />
                    </div>

                    <button
                        type="submit"
                        className="h-[50px] w-full rounded-full bg-[#0061ff] font-bold text-blue-50 transition duration-300 hover:bg-[#60efff] hover:text-white"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
