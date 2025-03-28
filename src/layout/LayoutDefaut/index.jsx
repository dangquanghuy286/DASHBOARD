import React from "react"; // Ensure React is imported
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SideBarLeft";
import { cn } from "../../util/cn";
import Header from "./Header";

function LayoutDefault() {
    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-900">
            <SidebarLeft />
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
