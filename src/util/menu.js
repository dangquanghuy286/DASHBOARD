import icons from "./icon";
const { MdDashboard, GrUserAdmin, FaUserAlt, MdTour, TbBrandBooking, FiLogOut, MdContactSupport, IoMdPricetag, MdArticle } = icons; // Đảm bảo có icon cho Logout

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
                path: "/discount",
                text: "Thẻ giảm giá",
                icon: IoMdPricetag,
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
                path: "/guide",
                text: "Quản lý hướng dẫn viên",
                icon: FaUserAlt,
            },
        ],
    },
    {
        link: [
            {
                path: "/blogs",
                text: "Quản lý bài viết",
                icon: MdArticle,
            },
        ],
    },
    {
        link: [
            {
                path: "/contact",
                text: "Liên hệ",
                icon: MdContactSupport,
            },
        ],
    },
    {
        link: [
            {
                path: "/logout",
                text: "Đăng xuất",
                icon: FiLogOut,
            },
        ],
    },
];
