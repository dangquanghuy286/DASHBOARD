import Admin from "../pages/Admin";
import Analytics from "../pages/Analytics";
import CreateTour from "../pages/CreateTour";
import Customer from "../pages/Customer";
import ListTour from "../pages/ListTour";
import Report from "../pages/Report";
import Tour from "../pages/Tour";
import Booking from "../pages/Booking";
import Contact from "../pages/Contact";
import Setting from "../pages/Setting";

import Home from "../pages/Home";
import LayoutDefault from "../layout/LayoutDefaut";

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
                path: "analytics",
                element: <Analytics />,
            },
            {
                path: "report",
                element: <Report />,
            },
            {
                path: "admin",
                element: <Admin />,
            },
            {
                path: "customer",
                element: <Customer />,
            },
            {
                path: "tour",
                element: <Tour />,
                children: [
                    {
                        index: true,
                        element: <Tour />,
                    },
                    {
                        path: "create_tour",
                        element: <CreateTour />,
                    },
                    {
                        path: "list_tour",
                        element: <ListTour />,
                    },
                ],
            },
            {
                path: "booking",
                element: <Booking />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "setting",
                element: <Setting />,
            },
        ],
    },
];
