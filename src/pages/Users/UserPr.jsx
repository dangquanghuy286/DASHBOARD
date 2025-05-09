/* eslint-disable no-unused-vars */
import BlockUser from "../../components/User/Block";
import EnableUser from "../../components/User/Enable";
import DeleteUser from "../../components/User/Delete";

function UserPr(props) {
    const { user, onReload } = props;

    // Giải mã token để lấy vai trò
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    const role = decoded?.authorities ? decoded.authorities[0] : localStorage.getItem("role");
    const isAdmin = role === "ROLE_ADMIN";

    // Ánh xạ isBlocked từ is_active
    const isBlocked = !user.is_active;

    const getRoleName = () => {
        if (!user.role) return "N/A";
        if (user.role.roleId === 2) return "Admin";
        return user.role.name || "N/A";
    };

    const handleImageError = (e) => {
        e.target.src = "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png";
    };

    const avatarUrl = user.avatar || `http://localhost:8088/api/v1/users/${user.id}/avatar`;

    return (
        <div className="mt-0 flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg sm:flex-row dark:border-gray-700 dark:bg-slate-800">
            {/* Avatar */}
            <div className="flex w-full items-center justify-center sm:order-first sm:w-1/2">
                <div className="h-50 w-50 overflow-hidden rounded-full border border-amber-300">
                    <img
                        src={avatarUrl}
                        alt={user.fullname}
                        className="h-full w-full object-cover"
                        onError={handleImageError}
                    />
                </div>
            </div>

            {/* Thông tin người dùng */}
            <div className="mt-4 flex w-full flex-col sm:mt-0 sm:w-1/2 sm:pr-4">
                <div className="flex flex-1 flex-col">
                    <h3 className="mt-0 text-lg font-bold text-gray-900 dark:text-white">{user.fullname}</h3>
                    <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            <span className="font-semibold">About:</span> {user.fullname || "Chưa có thông tin"}
                        </p>
                        <p>
                            <span className="font-semibold">Address:</span> {user.address || "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold">Phone:</span> {user.phone_number || "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span> {user.email || "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold">Vai trò:</span> {getRoleName()}
                        </p>
                        <p>
                            <span className="font-semibold">Trạng thái:</span>{" "}
                            {isBlocked ? (
                                <span className="font-bold text-red-500">Đã bị khóa</span>
                            ) : (
                                <span className="font-bold text-green-500">Hoạt động</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Button (Chỉ hiển thị cho admin) */}
                {isAdmin && (
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <div className="w-fit flex-shrink-0">
                            {isBlocked ? (
                                <EnableUser
                                    user={user}
                                    onReload={onReload}
                                />
                            ) : (
                                <BlockUser
                                    user={user}
                                    onReload={onReload}
                                />
                            )}
                        </div>
                        {/* Thêm điều kiện kiểm tra role */}
                        {user.role?.roleId !== 2 && ( // Giả sử roleId 2 là Admin
                            <div className="w-fit flex-shrink-0">
                                <DeleteUser
                                    user={user}
                                    onReload={onReload}
                                    // Có thể thêm prop disabled nếu component hỗ trợ
                                    disabled={user.role?.roleId === 2}
                                />
                            </div>
                        )}
                    </div>
                )}
                {!isAdmin && <p className="text-red-500">Bạn không có quyền thực hiện hành động này.</p>}
            </div>
        </div>
    );
}

export default UserPr;
