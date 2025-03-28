import React, { useState } from "react";
import { forwardRef } from "react";
import { cn } from "../../util/cn";
import logoDark from "../../assets/Img/dashboard_Dark.svg";
import logoLight from "../../assets/Img/dashboard_Light.svg";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { menu } from "../../util/menu";

const notActiveStyle = "text-[#e9e8ea] text-[14px]";
const activeStyle = "text-[#ffffff] text-[14px] font-bold";

const SideBarLeft = forwardRef(({ collapsed }, ref) => {
    const [openSubMenu, setOpenSubMenu] = useState(null);

    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white transition-[width_300ms_cubic-bezier(0.4,0,0.2,1)_left_300ms_cubic-bezier(0.4,0,0.2,1)_background-color_150ms_cubic-bezier(0.4,0,0.2,1)_border_150ms_cubic-bezier(0.4,0,0.2,1)] dark:border-slate-700 dark:bg-slate-900",
            )}
        >
            {/* Logo */}
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
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">DASHBOARD</p>}
            </div>

            {/* Menu Sidebar */}
            <div className="flex w-full flex-col gap-y-4 overflow-x-hidden overflow-y-auto p-3 [scrollbar-width:_thin]">
                <div className="flex flex-col py-3 text-left font-medium">
                    {menu.map((group, groupIndex) =>
                        group.link.map((item, index) => (
                            <div
                                key={item.path}
                                className="w-full hover:bg-[#453d5511]"
                            >
                                <NavLink
                                    end={item.end}
                                    to={item.children ? "#" : item.path} // Nếu có children thì không điều hướng
                                    className="w-full"
                                    onClick={() => item.children && toggleSubMenu(`${groupIndex}-${index}`)}
                                >
                                    {({ isActive }) => (
                                        <div
                                            className={`flex h-[48px] w-full items-center gap-3 px-[20px] ${
                                                isActive || openSubMenu === `${groupIndex}-${index}` ? "border-l-4 border-[#574de0] bg-[#242857]" : ""
                                            }`}
                                        >
                                            {/* Icon */}
                                            <div className="flex w-[18px] items-center justify-center">
                                                <item.icon
                                                    size={18}
                                                    color="#fff"
                                                />
                                            </div>

                                            {/* Text */}
                                            <span className={isActive ? activeStyle : notActiveStyle}>{item.text}</span>
                                        </div>
                                    )}
                                </NavLink>

                                {/* Hiển thị submenu nếu có */}
                                {item.children && openSubMenu === `${groupIndex}-${index}` && (
                                    <div className="ml-6 flex flex-col gap-2">
                                        {item.children.map((child) => (
                                            <NavLink
                                                key={child.path}
                                                to={`${item.path}/${child.path}`}
                                                className="flex h-[40px] items-center gap-3 px-4 text-gray-400 hover:text-white"
                                            >
                                                <child.icon size={16} />
                                                <span>{child.text}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )),
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
