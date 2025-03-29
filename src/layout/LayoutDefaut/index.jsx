import React, { useEffect, useRef, useState } from "react"; // Ensure React is imported
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "../../util/cn";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";

function LayoutDefault() {
    // Kiểm tra xem có phải thiết bị có màn hình >= 768px không (tức là desktop hoặc tablet ngang)
    const isDesktopDevice = useMediaQuery("(min-width:768px)");

    // State kiểm soát trạng thái thu gọn/mở rộng của Sidebar
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    // Tạo một ref để tham chiếu đến Sidebar
    const sidebarRef = useRef(null);

    // Cập nhật trạng thái thu gọn Sidebar mỗi khi kích thước màn hình thay đổi
    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            {/* Overlay hiển thị khi Sidebar mở trên thiết bị nhỏ */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
            ></div>

            {/* Sidebar bên trái */}
            <SideBarLeft
                ref={sidebarRef}
                collapsed={collapsed}
            />

            {/* Khu vực chứa Header và nội dung chính */}
            <div
                className={cn(
                    "transition-[margin] duration-300", // Hiệu ứng margin mượt mà trong 300ms
                    collapsed ? "md:ml-[70px]" : "md:ml-[240px]", // Điều chỉnh margin-left theo trạng thái Sidebar
                )}
            >
                {/* Header chứa thanh điều hướng trên cùng */}
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                {/* Nội dung trang sẽ hiển thị ở đây */}
                <div className="h-[calc(100vh-60px)] overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutDefault;
