import PropTypes from "prop-types";
import icons from "../../util/icon";
import { useTheme } from "../../hooks/use_theme";

import pFImg from "@/assets/Img/admin-1.jpg";
const { FaChevronLeft, FaSearch, IoIosSunny, IoIosMoon, FaBell } = icons;

function Header({ collapsed, setCollapsed }) {
    const { theme, setTheme } = useTheme();

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <FaChevronLeft className={collapsed ? "rotate-180" : ""} />
                </button>
                <div className="input">
                    <FaSearch
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        name="search"
                        placeholder="Tìm kiếm"
                        id="search"
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-12 rounded-full border border-amber-400"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <IoIosSunny
                        size={30}
                        className={theme === "dark" ? "hidden" : "text-yellow-400"}
                    />
                    <IoIosMoon
                        size={30}
                        className={theme === "dark" ? "text-yellow-400" : "hidden"}
                    />
                </button>
                <button className="btn-announcement size-12 rounded-full border border-b-blue-600">
                    <FaBell size={30} />
                </button>
                <button className="size-12 overflow-hidden rounded-full">
                    <img
                        src={pFImg}
                        alt="img"
                    />
                </button>
            </div>
        </header>
    );
}

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};

export default Header;
