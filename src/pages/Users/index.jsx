import { useEffect, useState } from "react";
import { getDataCustomer } from "../../services/customerSevice";
import icons from "../../util/icon";
import CreateUser from "./CreateUsers";
const { MdDelete, IoMdCreate } = icons;
function Customer() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataCustomer();

                setData(res.reverse() || []); // Đảm bảo data luôn là mảng tránh lỗi .map()
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* Phần tiêu đề */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-6 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý người dùng</h1>
            </div>
            {/* Thêm Sản Phẩm và Input Tìm Kiếm */}
            <CreateUser />
            {/* Nội dung chính */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800"
                        >
                            {/* Nội dung người dùng */}
                            <div className="mt-0 flex-2 pr-3">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">About:</span> {user.about || "Chưa có thông tin"}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Address:</span> {user.address || "N/A"}
                                </p>

                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Email:</span> {user.email || "N/A"}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Vai trò:</span> {user.role}
                                </p>
                                <div className="mt-4 flex gap-4">
                                    <button className="flex cursor-pointer items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none">
                                        <IoMdCreate className="mr-2 text-lg" /> Sửa
                                    </button>
                                    <button className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none">
                                        <MdDelete className="mr-2 text-lg" /> Xóa
                                    </button>
                                </div>
                            </div>

                            {/* Ảnh đại diện */}
                            <div className="h-50 w-50 flex-shrink-0 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
                                <img
                                    src={user.avatar || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"} // Ảnh mặc định nếu không có avatar
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
                )}
            </div>
        </div>
    );
}

export default Customer;
