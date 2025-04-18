import PropTypes from "prop-types";
import icons from "../../util/icon";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getDataCustomer } from "../../services/userSevice";
import DarkMode from "../../components/DarkMode";

import Menu from "../../components/Menu";

const { BiSolidChevronsRight } = icons;

function Header({ collapsed, setCollapsed }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userAvatar, setUserAvatar] = useState("https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png");

    const dropdownRef = useRef();

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
                    <Menu dropdownOpen={dropdownOpen} />
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
