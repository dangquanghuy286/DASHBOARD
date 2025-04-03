import { useEffect, useState } from "react";
import { getDataCustomer } from "../../services/customerSevice";

import CreateUser from "./CreateUsers";

import UserPr from "./UserPr";

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
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý người dùng</h1>
            </div>
            {/* Thêm Sản Phẩm và Input Tìm Kiếm */}
            <CreateUser />
            {/* Nội dung chính */}
            <div className="mt-0 grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <UserPr
                            key={index}
                            user={user}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
                )}
            </div>
        </div>
    );
}

export default Customer;
