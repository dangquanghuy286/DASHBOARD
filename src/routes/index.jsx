import Admin from "../pages/Admin";
import Booking from "../pages/Booking";
import Home from "../pages/Home";
import Customer from "../pages/Users";
import Tour from "../pages/Tour";
import BookingDetail from "../pages/Booking/BookingDetail";
import ShowBookingTour from "../pages/Booking/ShowBooking";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import PrivateRoutes from "../components/PrivateRoutes";
import ChangePass from "../pages/Admin/ChangePass";

export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            { index: true, element: <Home /> }, // Trang chủ
            {
                path: "admin",
                children: [
                    { index: true, element: <Admin /> }, // Trang quản trị
                    { path: "change-password", element: <ChangePass /> }, // Trang đổi mật khẩu
                ],
            },
            { path: "user", element: <Customer /> }, // Trang quản lý người dùng
            { path: "tour", element: <Tour /> }, // Trang quản lý tour
            {
                path: "booking",
                element: <Booking />, // Trang quản lý đặt tour
                children: [
                    { index: true, element: <ShowBookingTour /> }, // Hiển thị danh sách đặt tour
                    { path: ":id", element: <BookingDetail /> }, // Chi tiết đặt tour
                ],
            },
            { path: "logout", element: <Logout /> }, // Trang đăng xuất
        ],
    },
];
