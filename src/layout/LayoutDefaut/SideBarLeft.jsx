import React, { useState, forwardRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../util/cn";
import logoDark from "../../assets/Img/dashboard_Dark.svg";
import logoLight from "../../assets/Img/dashboard_Light.svg";
import PropTypes from "prop-types";
import { menu } from "../../util/menu";
import icons from "../../util/icon";

const { FaChevronDown, FaChevronUp } = icons;

const SideBarLeft = forwardRef(({ collapsed }, ref) => {
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const location = useLocation();

    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full flex-col overflow-x-hidden border-r border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[80px] md:items-center" : "md:w-[250px]",
                // Hiển thị trên mobile khi không collapsed
                collapsed && "max-md:hidden",
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
                {!collapsed && window.innerWidth >= 1024 && <p className="text-lg font-medium text-slate-900 dark:text-slate-50">DASHBOARD</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto p-3">
                <div className="flex flex-col py-3 text-left font-medium">
                    {menu.map((group, groupIndex) =>
                        group.link.map((item, index) => {
                            const isParentActive = item.children ? location.pathname.startsWith(item.path) : false;
                            const isActiveOrOpen =
                                (item.children && isParentActive) ||
                                (!item.children && location.pathname === item.path) ||
                                openSubMenu === `${groupIndex}-${index}`;

                            return (
                                <div
                                    key={item.path}
                                    className={`w-full ${isActiveOrOpen ? "bg-[#f0f0f0] dark:bg-[#2a2a2a]" : "hover:bg-[#453d5511]"}`}
                                >
                                    <NavLink
                                        to={item.children ? "#" : item.path}
                                        end={!item.children}
                                        className="w-full"
                                        onClick={() => item.children && toggleSubMenu(`${groupIndex}-${index}`)}
                                    >
                                        <div
                                            className={`flex h-[48px] w-full items-center gap-3 px-[20px] ${
                                                isActiveOrOpen
                                                    ? "border-l-4 border-[#ff5858] bg-[#ffc8c8] dark:border-[#ff0f7b] dark:bg-[#45caff]"
                                                    : "hover:bg-[#cad0ff22]"
                                            }`}
                                        >
                                            <div className="flex w-[18px] items-center justify-center">
                                                <item.icon
                                                    size={18}
                                                    className={`${
                                                        isActiveOrOpen ? "text-[#ff5858] dark:text-[#ff0f7b]" : "text-black dark:text-white"
                                                    }`}
                                                />
                                            </div>
                                            {!collapsed && window.innerWidth >= 1024 && (
                                                <span
                                                    className={`${
                                                        isActiveOrOpen
                                                            ? "font-semibold text-black dark:text-white"
                                                            : "text-gray-600 dark:text-gray-300"
                                                    }`}
                                                >
                                                    {item.text}
                                                </span>
                                            )}
                                        </div>
                                    </NavLink>
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
SideBarLeft.propTypes = {
    collapsed: PropTypes.bool,
};

export default SideBarLeft;
