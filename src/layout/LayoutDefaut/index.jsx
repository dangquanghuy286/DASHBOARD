import React, { useRef, useState } from "react"; // Ensure React is imported
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "../../util/cn";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";

function LayoutDefault() {
    const isDesktopDevice = useMediaQuery("(min-width:768px)");

    const [collapsed, setCollapsed] = useState(true);

    const sidebarRef = useRef(null);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
            ></div>
            {/* inset là một thuộc tính rút gọn (shorthand) dùng để thiết lập đồng thời các giá trị của top, right, bottom, và left cho một phần tử được định vị (position: absolute, position: fixed, hoặc position: relative). */}
            <SideBarLeft
                ref={sidebarRef}
                collapsed={collapsed}
            />
            <div
                className={cn(
                    "transition-[margin] duration-300", // Hiệu ứng chuyển động mượt mà cho margin, kéo dài 300ms
                    collapsed ? "md:ml-[70px]" : "md:ml-[240px]", // Khi thu gọn, margin-left là 70px; khi mở rộng, margin-left là 240px (chỉ áp dụng từ màn hình >= 768px)
                )}
            >
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <div className="h-[calc(100vh-60px) overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutDefault;
