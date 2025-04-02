import { useEffect, useState } from "react";
import { getDataCustomer } from "../../services/customerSevice";

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

            {/* Nội dung chính */}
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800"
                        >
                            {/* Nội dung người dùng */}
                            <div className="flex-1 pr-4">
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
                                <div className="mt-4 flex gap-2">
                                    <button className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600">Chặn</button>
                                    <button className="rounded bg-gray-500 px-3 py-1 text-white transition hover:bg-gray-600">Xóa</button>
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
