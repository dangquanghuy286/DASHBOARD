import { useState } from "react";

import { useForm } from "react-hook-form";
import CreateTour from "./CreateTour";
import icons from "../../util/icon";
const { FaSearch } = icons;
function ShowTour() {
    // State để lưu dữ liệu hiển thị
    const [data, setData] = useState([]);
    // State để lưu dữ liệu gốc, dùng để reset sau khi search
    const [originalData, setOriginalData] = useState([]);
    // Hook form để quản lý form search
    const { register, handleSubmit } = useForm();
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
        <>
            <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
                {/* Phần tiêu đề */}
                <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                    <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Tour</h1>
                </div>

                {/* Nội dung chính */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="space-x-2">
                        <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">Copy</button>
                        <button className="rounded bg-green-500 px-3 py-1 text-sm text-white">CSV</button>
                        <button className="rounded bg-yellow-500 px-3 py-1 text-sm text-white">Excel</button>
                        <button className="rounded bg-red-500 px-3 py-1 text-sm text-white">PDF</button>
                        <button className="rounded bg-gray-500 px-3 py-1 text-sm text-white">Print</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="entries"
                            className="text-sm"
                        >
                            Show
                        </label>
                        <select
                            id="entries"
                            className="rounded border px-2 py-1 text-sm text-black"
                        >
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <span className="text-sm">entries</span>
                    </div>
                </div>

                <div className="my-6 ml-6 flex items-center justify-between">
                    {" "}
                    <div className="flex items-center space-x-2">
                        <CreateTour />
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

                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-black dark:text-white">
                        <thead className="bg-gray-100 text-left dark:bg-slate-800">
                            <tr>
                                <th className="border px-4 py-2">Tên</th>
                                <th className="border px-4 py-2">Thời gian</th>
                                <th className="border px-4 py-2">Mô tả</th>
                                <th className="border px-4 py-2">Số lượng</th>
                                <th className="border px-4 py-2">Giá người lớn</th>
                                <th className="border px-4 py-2">Giá trẻ em</th>
                                <th className="border px-4 py-2">Điểm đến</th>
                                <th className="border px-4 py-2">Khả dụng</th>
                                <th className="border px-4 py-2">Ngày bắt đầu</th>
                                <th className="border px-4 py-2">Ngày kết thúc</th>
                                <th className="border px-4 py-2 text-center">Sửa</th>
                                <th className="border px-4 py-2 text-center">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">MIỀN BẮC 4N3Đ | HÀ NỘI – NINH BÌNH – HẠ LONG – YÊN TỬ</td>
                                <td className="border px-4 py-2">3 ngày 2 đêm</td>
                                <td className="border px-4 py-2">
                                    Điểm nhấn chương trình: Tham quan Hà Nội, Ninh Bình, Hạ Long, Yên Tử, khách sạn 3 sao.
                                </td>
                                <td className="border px-4 py-2">33</td>
                                <td className="border px-4 py-2">6.290.000</td>
                                <td className="border px-4 py-2">5.000.000</td>
                                <td className="border px-4 py-2">HÀ NỘI – NINH BÌNH – HẠ LONG – YÊN TỬ</td>
                                <td className="border px-4 py-2">1</td>
                                <td className="border px-4 py-2">11-01-2025</td>
                                <td className="border px-4 py-2">14-01-2025</td>
                                <td className="cursor-pointer border px-4 py-2 text-center text-blue-600"></td>
                                <td className="cursor-pointer border px-4 py-2 text-center text-red-600">🗑️</td>
                            </tr>
                            {/* Có thể thêm nhiều dòng dữ liệu tương tự */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default ShowTour;
