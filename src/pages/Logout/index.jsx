/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { deleteAllCookies } from "../../helpers/cookie";

function Logout() {
    const nav = useNavigate(); // Hook dùng để điều hướng
    const dispatch = useDispatch(); // Hook dùng để gọi action Redux

    useEffect(() => {
        // Hiển thị hộp thoại xác nhận đăng xuất
        Swal.fire({
            title: "Xác nhận đăng xuất",
            text: "Bạn có chắc muốn đăng xuất khỏi hệ thống?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Đăng xuất",
            cancelButtonText: "Hủy",
            reverseButtons: true,
            position: "center",
        }).then((result) => {
            if (result.isConfirmed) {
                // Xoá token khỏi localStorage

                // localStorage.removeItem("token");
                deleteAllCookies();
                // Hiển thị thông báo đăng xuất thành công
                Swal.fire({
                    title: "Đăng xuất",
                    text: "Bạn đã đăng xuất thành công.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    position: "top-end",
                });

                // Sau 2 giây, cập nhật trạng thái đăng nhập và chuyển hướng đến trang đăng nhập
                setTimeout(() => {
                    dispatch(checkLogin(false));
                    nav("/login");
                }, 2000);
            } else {
                // Nếu người dùng huỷ, quay về trang chủ hoặc trang trước đó
                nav("/"); // Hoặc sử dụng history.back() hay một đường dẫn cụ thể
            }
        });
    }, [dispatch, nav]);

    return null; // Không cần hiển thị giao diện
}

export default Logout;
