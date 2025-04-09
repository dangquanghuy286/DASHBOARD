import Admin from "../pages/Admin";

import Booking from "../pages/Booking";

import Home from "../pages/Home";
import LayoutDefault from "../layout/LayoutDefaut";
import Customer from "../pages/Users";
import Tour from "../pages/Tour";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            // {
            //     path: "analytics",
            //     element: <Analytics />,
            // },
            // {
            //     path: "report",
            //     element: <Report />,
            // },
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
            },
        ],
    },
];
