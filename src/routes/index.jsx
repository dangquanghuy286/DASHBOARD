import Guide from "../components/Guide/Guide";
import PrivateRoutes from "../components/PrivateRoutes";
import Admin from "../pages/Admin";
import ChangePasswordPage from "../pages/Admin/ChangePass";
import Booking from "../pages/Booking";
import ShowBookingTour from "../pages/Booking/ShowBooking";
import ContactNotifications from "../pages/Contact";
import DisCount from "../pages/DisCount";
import NotFound from "../pages/Error";
import Home from "../Pages/Home";
import BookingDetail from "../pages/Invoice/BookingDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Tour from "../pages/Tour";
import User from "../pages/Users";

export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "admin",
                children: [
                    { index: true, element: <Admin /> },
                    { path: "change-password", element: <ChangePasswordPage /> },
                ],
            },
            { path: "user", element: <User /> },
            { path: "tour", element: <Tour /> },
            { path: "guide", element: <Guide /> },
            { path: "discount", element: <DisCount /> },
            {
                path: "booking",
                element: <Booking />,
                children: [{ index: true, element: <ShowBookingTour /> }],
            },
            {
                path: "invoice/bookings/:id",
                element: <BookingDetail />,
            },
            { path: "contact", element: <ContactNotifications /> },
            { path: "logout", element: <Logout /> },
            { path: "*", element: <NotFound /> },
        ],
    },
    { path: "*", element: <NotFound /> },
];
