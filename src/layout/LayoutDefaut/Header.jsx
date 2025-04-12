import PropTypes from "prop-types";
import icons from "../../util/icon";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getCookie } from "../../helpers/cookie";
import { getDataCustomer } from "../../services/userSevice"; // <-- Đảm bảo đã import hàm này
import DarkMode from "../../components/DarkMode";
import Bell from "../../components/Bell";

const { BiSolidChevronsRight } = icons;

function Header({ collapsed, setCollapsed }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    const [userAvatar, setUserAvatar] = useState("https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png");

    useEffect(() => {
        const token = getCookie("token");
        const fetchUser = async () => {
            try {
                const res = await getDataCustomer();
                const currentUser = res.find((user) => user.token === token);
                if (currentUser && currentUser.avatar) {
                    setUserAvatar(currentUser.avatar);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };
        fetchUser();
    }, []);

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
                <DarkMode />
                <Bell />
                <div
                    className="relative"
                    ref={dropdownRef}
                >
                    <button
                        className="size-12 cursor-pointer overflow-hidden rounded-full"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img
                            src={userAvatar}
                            alt="Ảnh đại diện người dùng"
                            className="h-full w-full object-cover"
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
                                        to="/admin"
                                        className="block w-full rounded-md px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                                    >
                                        Thay đổi mật khẩu
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
