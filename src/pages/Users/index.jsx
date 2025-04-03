import { useEffect, useState } from "react";
import { getDataCustomer } from "../../services/customerSevice";
import CreateUser from "./CreateUsers";
import { useForm } from "react-hook-form";
import UserPr from "./UserPr";
import icons from "../../util/icon";
const { FaSearch } = icons;

function Customer() {
    // State để lưu dữ liệu hiển thị
    const [data, setData] = useState([]);
    // State để lưu dữ liệu gốc, dùng để reset sau khi search
    const [originalData, setOriginalData] = useState([]);
    // Hook form để quản lý form search
    const { register, handleSubmit } = useForm();

    // useEffect để fetch dữ liệu khi component mount
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataCustomer(); // Gọi API lấy dữ liệu
                const dataArray = res.reverse() || []; // Đảo ngược mảng dữ liệu, đảm bảo là mảng
                setData(dataArray); // Cập nhật dữ liệu hiển thị
                setOriginalData(dataArray); // Lưu dữ liệu gốc
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setData([]); // Đặt mảng rỗng nếu lỗi
                setOriginalData([]); // Đặt mảng rỗng cho dữ liệu gốc nếu lỗi
            }
        };
        fetchApi();
    }, []); // Dependency array rỗng để chỉ chạy 1 lần khi mount

    // Hàm xử lý khi submit form search
    const onSearch = (formData) => {
        // Lấy giá trị search từ form, chuyển thành lowercase và xóa khoảng trắng thừa Ascendingly được gọi là trim()
        const searchTerm = formData.name?.toLowerCase().trim() || "";

        // Nếu không nhập gì (search rỗng), reset về dữ liệu gốc
        if (searchTerm === "") {
            setData(originalData);
            return;
        }

        // Lọc dữ liệu gốc dựa trên từ khóa tìm kiếm
        const filteredData = originalData.filter((user) =>
            // Kiểm tra xem tên user có chứa searchTerm không (không phân biệt hoa/thường)
            user.name?.toLowerCase().includes(searchTerm),
        );
        setData(filteredData); // Cập nhật state với dữ liệu đã lọc
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý người dùng</h1>
            </div>

            {/* Phần search và nút thêm user */}
            <div className="my-6 ml-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <CreateUser /> {/* Component để tạo user mới */}
                    {/* Form search */}
                    <form
                        className="inline"
                        onSubmit={handleSubmit(onSearch)} // Gọi onSearch khi submit
                    >
                        <div className="input">
                            <button type="submit">
                                <FaSearch
                                    size={20}
                                    className="cursor-pointer text-slate-300"
                                />
                            </button>
                            <input
                                {...register("name")} // Đăng ký input với react-hook-form
                                type="text"
                                placeholder="Tìm kiếm"
                                className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Hiển thị danh sách user */}
            <div className="mt-0 grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                {data.length > 0 ? (
                    data.map((user, index) => (
                        <UserPr
                            key={index} // Key cho mỗi item trong list
                            user={user} // Truyền dữ liệu user cho component con
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
