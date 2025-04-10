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
                position: "top-end",
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
                position: "top-end",
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
