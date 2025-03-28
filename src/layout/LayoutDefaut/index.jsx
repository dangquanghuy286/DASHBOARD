import React from "react"; // Ensure React is imported
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SideBarLeft";

function LayoutDefault() {
    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-900">
            <SidebarLeft />
            <Outlet /> {/* Ensure Outlet is used if needed */}
        </div>
    );
}

export default LayoutDefault;
