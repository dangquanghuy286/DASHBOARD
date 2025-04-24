/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Logout() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Xóa token và thông tin người dùng khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        // Hiển thị thông báo đăng xuất thành công
        Swal.fire({
            title: "Đăng xuất",
            text: "Bạn đã đăng xuất thành công.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            position: "top-end",
        });

        // Sau 2 giây, cập nhật trạng thái và điều hướng
        setTimeout(() => {
            dispatch(checkLogin(false));
            nav("/login");
        }, 2000);
    }, []);

    return null; // Không render gì cả
}

export default Logout;
