import React, { useState, forwardRef, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../util/cn";
import logoDark from "../../assets/Img/dashboard_Dark.svg";
import logoLight from "../../assets/Img/dashboard_Light.svg";
import PropTypes from "prop-types";
import { menu } from "../../util/menu";
import icons from "../../util/icon";
import { useClickOutside } from "../../hooks/use_Click_outSize";

const { FaChevronDown, FaChevronUp } = icons;

// Component Sidebar (Thanh điều hướng bên trái)
const SideBarLeft = forwardRef(({ collapsed }, ref) => {
    // State để kiểm soát submenu nào đang mở
    const [openSubMenu, setOpenSubMenu] = useState(null);
    // Hook lấy thông tin URL hiện tại
    const location = useLocation();

    const sidebarRef = useRef(null);
    const wrapperRef = useRef(null);

    // Close sidebar when clicking outside
    useClickOutside([sidebarRef, wrapperRef], () => {
        if (!collapsed) {
            setOpenSubMenu(null); // Close all submenus
        }
    });

    /**
     * Hàm xử lý mở/đóng submenu khi người dùng nhấn vào menu cha
     * @param {string} index - Chỉ số của menu cha trong danh sách
     */
    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    return (
        <aside
            ref={(node) => {
                sidebarRef.current = node;
                if (ref) ref.current = node;
            }}
            className={cn(
                "fixed z-[100] flex h-full flex-col overflow-x-hidden border-r border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900",
                "max-md:hidden", // Ẩn hoàn toàn khi màn hình nhỏ hơn 768px
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
            )}
        >
            <div className="flex h-[50px] w-[50px] gap-x-3 p-3">
                <img
                    src={logoLight}
                    alt="LogoLight"
                    className="dark:hidden"
                />
                <img
                    src={logoDark}
                    alt="LogoDark"
                    className="hidden dark:block"
                />
                {collapsed === false && window.innerWidth >= 1024 && (
                    <p className="text-lg font-medium text-slate-900 dark:text-slate-50">DASHBOARD</p>
                )}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto p-3">
                <div className="flex flex-col py-3 text-left font-medium">
                    {menu.map((group, groupIndex) =>
                        group.link.map((item, index) => {
                            const isParentActive = item.children ? location.pathname.startsWith(item.path) : false;
                            return (
                                <div
                                    key={item.path}
                                    className="w-full hover:bg-[#453d5511]"
                                >
                                    <NavLink
                                        to={item.children ? "#" : item.path}
                                        end={!item.children}
                                        className="w-full"
                                        onClick={() => item.children && toggleSubMenu(`${groupIndex}-${index}`)}
                                    >
                                        {({ isActive }) => {
                                            const isActiveOrOpen =
                                                (item.children && isParentActive) ||
                                                (!item.children && isActive) ||
                                                openSubMenu === `${groupIndex}-${index}`;
                                            return (
                                                <div
                                                    className={`flex h-[48px] w-full items-center gap-3 px-[20px] ${
                                                        isActiveOrOpen ? "border-l-4 border-[#574de0] bg-[#322F5A]" : "hover:bg-[#453d5511]"
                                                    }`}
                                                >
                                                    <div className="flex w-[18px] items-center justify-center">
                                                        <item.icon
                                                            size={18}
                                                            className="text-black dark:text-white"
                                                        />
                                                    </div>
                                                    {collapsed === false && window.innerWidth >= 1024 && (
                                                        <span
                                                            className={`${
                                                                isActiveOrOpen ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"
                                                            }`}
                                                        >
                                                            {item.text}
                                                        </span>
                                                    )}
                                                    {item.children && !collapsed && (
                                                        <div className="ml-auto">
                                                            {openSubMenu === `${groupIndex}-${index}` ? (
                                                                <FaChevronUp
                                                                    className="text-black dark:text-white"
                                                                    size={14}
                                                                />
                                                            ) : (
                                                                <FaChevronDown
                                                                    className="text-black dark:text-white"
                                                                    size={14}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </NavLink>

                                    {item.children && openSubMenu === `${groupIndex}-${index}` && !collapsed && (
                                        <div className="ml-6 flex flex-col gap-2">
                                            {item.children.map((child) => (
                                                <NavLink
                                                    key={child.path}
                                                    to={`${item.path}/${child.path}`}
                                                    end
                                                    className="flex h-[40px] items-center gap-3 px-4 text-black hover:text-black dark:text-white dark:hover:text-white"
                                                >
                                                    <child.icon
                                                        size={16}
                                                        className="text-black dark:text-white"
                                                    />
                                                    <span>{child.text}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }),
                    )}
                </div>
            </div>
        </aside>
    );
});

SideBarLeft.displayName = "Sidebar";

// Định nghĩa kiểu dữ liệu cho props
SideBarLeft.prototype = {
    collapsed: PropTypes.bool,
};

export default SideBarLeft;
