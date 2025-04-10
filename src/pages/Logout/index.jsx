/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Logout() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    deleteAllCookies();
    useEffect(() => {
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
