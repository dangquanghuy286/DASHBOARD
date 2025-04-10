import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import LayoutDefault from "../../layout/LayoutDefaut";

function PrivateRoutes() {
    const token = getCookie("token");
    return token ? <LayoutDefault /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
