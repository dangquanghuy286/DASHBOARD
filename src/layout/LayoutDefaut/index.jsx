import { Outlet } from "react-router-dom";

function LayoutDefault() {
    return (
        <>
            <div className="layout-default">
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
