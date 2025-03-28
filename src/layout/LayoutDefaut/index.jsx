import React from "react"; // Ensure React is imported
import { Outlet } from "react-router-dom";

import { cn } from "../../util/cn";
import Header from "./Header";
import SideBarLeft from "./SideBarLeft";

function LayoutDefault() {
    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-900">
            <SideBarLeft />
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
