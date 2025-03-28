import React, { useRef, useState } from "react"; // Ensure React is imported
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "../../util/cn";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";

function LayoutDefault() {
    const isDesktopDevice = useMediaQuery("(min-width:768px)");
    const [collapsed, setCollapsed] = useState(false);

    const sidebarRef = useRef(null);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-900">
            <SideBarLeft
                ref={sidebarRef}
                collapsed={collapsed}
            />
            <div className={cn("transition-[margin] duration-300")}>
                <Header />
                <div className="h-[calc(100vh-60px) overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutDefault;
