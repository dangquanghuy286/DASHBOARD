import React from "react";
import { forwardRef } from "react";
import { cn } from "../../util/cn";
import logoDark from "../../assets/Img/dashboard_Dark.svg";
import logoLight from "../../assets/Img/dashboard_Light.svg";
import PropTypes from "prop-types";
const SideBarLeft = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white transition-[width_300ms_cubic-bezier(0.4,0,0.2,1)_left_300ms_cubic-bezier(0.4,0,0.2,1)_background-color_150ms_cubic-bezier(0.4,0,0.2,1)_border_150ms_cubic-bezier(0.4,0,0.2,1)] dark:border-slate-700 dark:bg-slate-900",
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
                    alt="LogoLight"
                    className="hidden dark:block"
                />
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">DASHBOARD</p>}
            </div>
        </aside>
    );
});

SideBarLeft.displayName = "Sidebar";
SideBarLeft.prototype = {
    collapsed: PropTypes.bool,
};
export default SideBarLeft;
