import PropTypes from "prop-types";
import icons from "../../util/icon";
import { useTheme } from "../../hooks/use_theme";

import pFImg from "@/assets/Img/admin-1.jpg";
import { useEffect, useRef, useState } from "react";
const { BiSolidChevronsRight, IoIosSunny, IoIosMoon, FaBell } = icons;
import { Link } from "react-router-dom";
function Header({ collapsed, setCollapsed }) {
    const { theme, setTheme } = useTheme();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <BiSolidChevronsRight className={collapsed ? "rotate-180" : ""} />
                </button>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-12 rounded-full border border-amber-400"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <IoIosSunny
                        size={20}
                        className={theme === "dark" ? "hidden" : "text-yellow-400"}
                    />
                    <IoIosMoon
                        size={20}
                        className={theme === "dark" ? "text-yellow-400" : "hidden"}
                    />
                </button>
                <button className="btn-announcement size-12 rounded-full border border-blue-600">
                    <FaBell size={20} />
                </button>
                <div
                    className="relative"
                    ref={dropdownRef}
                >
                    <button
                        className="size-12 cursor-pointer overflow-hidden rounded-full"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img
                            src={pFImg}
                            alt="Ảnh đại diện người dùng"
                        />
                    </button>

                    {dropdownOpen && (
                        <nav className="absolute right-0 z-20 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg dark:border-slate-600 dark:bg-slate-800">
                            <ul className="mb-1 flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-200">
                                <li className="flex items-center gap-2 border-b-2 border-slate-200 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700">
                                    <Link
                                        to="/admin"
                                        className="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                                    >
                                        Hồ sơ cá nhân
                                    </Link>
                                </li>

                                <li className="flex items-center gap-2 border-b-2 border-slate-200 px-3 py-2 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700">
                                    <Link
                                        to="/logout"
                                        className="block w-full rounded-md px-3 py-2 text-left text-red-500 hover:bg-slate-100 dark:text-red-400 dark:hover:bg-slate-700"
                                    >
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};

export default Header;
