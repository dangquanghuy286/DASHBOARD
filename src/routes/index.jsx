import Admin from "../pages/Admin";

import Booking from "../pages/Booking";

import Home from "../pages/Home";
import LayoutDefault from "../layout/LayoutDefaut";
import Customer from "../pages/Users";
import Tour from "../pages/Tour";
import Report from "../pages/Report";
import BookingDetail from "../pages/Booking/BookingDetail";
import ShowBookingTour from "../pages/Booking/ShowBooking";
import ShowTour from "../pages/Tour/ShowTour";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: "admin",
                element: <Admin />,
            },
            {
                path: "user",
                element: <Customer />,
            },
            {
                path: "tour",
                element: <Tour />,
            },
            {
                path: "booking",
                element: <Booking />,
                children: [
                    {
                        index: true,
                        element: <ShowBookingTour />,
                    },
                    {
                        path: ":id",
                        element: <BookingDetail />,
                    },
                ],
            },
        ],
    },
];
