import { Navigate, Outlet } from "react-router-dom";
import LayoutDefault from "../../layout/LayoutDefaut";

function PrivateRoutes() {
    const token = localStorage.getItem("token");
    if (token) {
        return (
            <LayoutDefault>
                <Outlet />
            </LayoutDefault>
        );
    }

    return (
        <Navigate
            to="/login"
            replace
        />
    );
}
export default PrivateRoutes;
