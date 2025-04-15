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

    // Xóa token khỏi localStorage khi đăng xuất
    localStorage.removeItem("token");

    useEffect(() => {
        // Hiển thị thông báo đăng xuất thành công
        Swal.fire({
            title: "Logged Out",
            text: "Bạn đã đăng xuất thành công.",
            icon: "warning",
            timer: 2000,
            showConfirmButton: false,
            position: "top-end",
        });

        // Sau 2 giây, dispatch action để cập nhật trạng thái đăng nhập và điều hướng người dùng đến trang đăng nhập
        setTimeout(() => {
            dispatch(checkLogin(false));
            nav("/login");
        }, 2000);
    }, [dispatch, nav]);

    return null; // Không cần render gì
}

export default Logout;
