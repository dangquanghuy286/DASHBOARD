import { Outlet } from "react-router-dom";

function LayoutDefault() {
    return (
        <>
            <div className="flex min-h-screen flex-col bg-slate-100 transition-colors dark:bg-slate-900">
                header
                <main className="layout-default__main">
                    SidebarLeft
                    <Outlet />
                </main>
                footer
            </div>
        </>
    );
}
export default LayoutDefault;
