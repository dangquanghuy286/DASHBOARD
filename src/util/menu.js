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
    {
        link: [
            {
                path: "/analytics",
                text: "Dữ liệu phân tích",
                icon: IoMdAnalytics,
            },
        ],
    },
    {
        link: [
            {
                path: "/report",
                text: "Báo cáo",
                icon: HiDocumentReport,
            },
        ],
    },
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
                path: "/customer",
                text: "Quản lý khách hàng",
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
                children: [
                    {
                        path: "create_tour",
                        text: "Tạo Tour",
                        icon: IoIosCreate,
                    },
                    {
                        path: "list_tour",
                        text: "Danh sách Tour",
                        icon: FaClipboardList,
                    },
                ],
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
    {
        link: [
            {
                path: "/contact",
                text: "Liên hệ",
                icon: MdContactPhone,
            },
        ],
    },
    {
        link: [
            {
                path: "/setting",
                text: "Cài đặt",
                icon: IoIosSettings,
            },
        ],
    },
];
