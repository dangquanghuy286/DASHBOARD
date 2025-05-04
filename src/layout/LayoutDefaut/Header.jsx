import PropTypes from "prop-types";
import icons from "../../util/icon";
import { useEffect, useRef, useState } from "react";
import { getInfoAdmin } from "../../services/adminService";
import DarkMode from "../../components/DarkMode";
import Menu from "../../components/Menu";

const { BiSolidChevronsRight } = icons;

function Header({ collapsed, setCollapsed }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const [userAvatar, setUserAvatar] = useState("https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png");

    useEffect(() => {
        const userIdToCheck = localStorage.getItem("user_id");

        const fetchUser = async () => {
            try {
                const res = await getInfoAdmin(userIdToCheck);
                console.log("Response from getInfoAdmin:", res);

                if (res && res.user_id === userIdToCheck) {
                    if (res.avatar_path) {
                        setUserAvatar(res.avatar_path);
                    } else {
                        console.warn("Không tìm thấy avatar_path, sử dụng ảnh mặc định");
                    }
                } else {
                    console.error("Không tìm thấy người dùng hợp lệ hoặc user_id không khớp");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error.response ? error.response.data : error.message);
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
            <div className="flex items-center gap-x-3 py-2">
                <DarkMode />
                <div
                    className="relative"
                    ref={dropdownRef}
                >
                    <button
                        className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-amber-400 bg-slate-50 dark:bg-slate-950"
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
