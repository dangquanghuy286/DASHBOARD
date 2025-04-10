/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function Logout() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    deleteAllCookies();
    useEffect(() => {
        Swal.fire({
            title: "Logged Out",
            text: "Bạn đã đăng xuất thành công.",
            icon: "warning",
            timer: 2000,
            showConfirmButton: false,
            position: "top-end",
        });
        setTimeout(() => {
            dispatch(checkLogin(false));
            nav("/login");
        }, 2000);
    }, []);
    return (
        <div className="logout">
            <h1>Đăng xuất thành công</h1>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        </div>
    );
}
export default Logout;
