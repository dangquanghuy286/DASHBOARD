// import { Navigate, Outlet } from "react-router-dom";
// import LayoutDefault from "../../layout/LayoutDefaut";

// function PrivateRoutes() {
//     const token = localStorage.getItem("token"); // Kiểm tra token từ localStorage

//     // Nếu có token, render LayoutDefault và các route con
//     if (token) {
//         return (
//             <LayoutDefault>
//                 <Outlet /> {/* Render các route con */}
//             </LayoutDefault>
//         );
//     }

//     // Nếu không có token, chuyển hướng đến trang đăng nhập
//     return (
//         <Navigate
//             to="/login"
//             replace
//         />
//     );
// }

// export default PrivateRoutes;

import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import LayoutDefault from "../../layout/LayoutDefaut";

function PrivateRoutes() {
    const token = getCookie("token");
    return token ? <LayoutDefault /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
