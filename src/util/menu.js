import icons from "./icon";
const {
    MdDashboard,
    IoMdAnalytics,
    HiDocumentReport,
    GrUserAdmin,
    FaUserAlt,
    MdTour,
    IoIosCreate,
    FaClipboardList,
    TbBrandBooking,
    MdContactPhone,
    IoIosSettings,
} = icons;
export const menu = [
    {
        link: [
            {
                path: "/",
                text: "Trang chủ",
                icon: MdDashboard,
                end: true,
            },
        ],
    },
    // {
    //     link: [
    //         {
    //             path: "/analytics",
    //             text: "Dữ liệu phân tích",
    //             icon: IoMdAnalytics,
    //         },
    //     ],
    // },
    // {
    //     link: [
    //         {
    //             path: "/report",
    //             text: "Báo cáo",
    //             icon: HiDocumentReport,
    //         },
    //     ],
    // },
    {
        link: [
            {
                path: "/admin",
                text: "Quản lý Admin",
                icon: GrUserAdmin,
            },
        ],
    },
    {
        link: [
            {
                path: "/user",
                text: "Quản lý người dùng",
                icon: FaUserAlt,
            },
        ],
    },
    {
        link: [
            {
                path: "/tour",
                text: "Tour",
                icon: MdTour,
            },
        ],
    },

    {
        link: [
            {
                path: "/booking",
                text: "Quản lý booking",
                icon: TbBrandBooking,
            },
        ],
    },
];
