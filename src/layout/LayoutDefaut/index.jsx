import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "../../util/cn";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";
import { useClickOutside } from "../../hooks/use_Click_outSize";

function LayoutDefault() {
    const isDesktopDevice = useMediaQuery("(min-width:768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    // Gộp logic click outside
    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true); // Đóng Sidebar trên mobile
        }
    });

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
            ></div>

            <SideBarLeft
                ref={sidebarRef}
                collapsed={collapsed}
            />

            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <div className="h-[calc(100vh-60px)] overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutDefault;
