import { useEffect, useState } from "react";
import { getDataCustomer } from "../../services/customerSevice";
import icons from "../../util/icon";
const { MdDelete, IoMdCreate, IoIosAdd, FaSearch } = icons;
function Customer() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataCustomer();
                console.log(res);

                setData(res || []); // Đảm bảo data luôn là mảng tránh lỗi .map()
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
            <div className="my-6 ml-6 flex items-center justify-between">
                <div className="flex space-x-2">
                    {/* Nút Thêm Sản Phẩm */}
                    <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-2 text-lg text-white shadow-md hover:bg-gradient-to-l focus:outline-none">
                        <IoIosAdd className="text-xl" /> Thêm người dùng
                    </button>

                    {/* Input Tìm Kiếm */}
                    <div className="input">
                        <FaSearch
                            size={20}
                            className="cursor-pointer text-slate-300"
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
            </div>
            {/* Nội dung chính */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800"
                        >
                            {/* Nội dung người dùng */}
                            <div className="flex-2 pr-3">
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
                                    <span className="font-semibold">Status:</span> {user.status}
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
