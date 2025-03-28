import { forwardRef } from "react";
import { cn } from "../../util/cn";

const SideBarLeft = forwardRef(({}, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white transition-[width_300ms_cubic-bezier(0.4,0,0.2,1)_left_300ms_cubic-bezier(0.4,0,0.2,1)_background-color_150ms_cubic-bezier(0.4,0,0.2,1)_border_150ms_cubic-bezier(0.4,0,0.2,1)] dark:border-slate-700 dark:bg-slate-900",
            )}
        ></aside>
    );
});

SideBarLeft.displayName = "Sidebar";
export default SideBarLeft;
