import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreateTour from "./CreateTour";
import icons from "../../util/icon";
import { getDataTour } from "../../services/tourService";

const { FaSearch } = icons;

function ShowTour() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataTour();
                const dataArray = res.tours?.reverse() || [];
                setData(dataArray);
                setOriginalData(dataArray);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setData([]);
                setOriginalData([]);
            }
        };
        fetchApi();
    }, []);

    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";

        // Reset về dữ liệu gốc nếu không có từ khóa tìm kiếm
        if (!searchTerm) {
            setData(originalData);
            return;
        }

        // Lọc dữ liệu dựa trên tourName (hoặc các trường khác nếu cần)
        const filteredData = originalData.filter((tour) => {
            // Kiểm tra tourName tồn tại và là chuỗi trước khi lọc
            const tourName = tour.tourName && typeof tour.tourName === "string" ? tour.tourName.toLowerCase() : "";
            return tourName.includes(searchTerm);
        });

        setData(filteredData);
    };

    return (
        <>
            <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
                <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                    <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Tour</h1>
                </div>

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
                    <div className="flex items-center space-x-2">
                        <CreateTour />
                        <form
                            className="inline"
                            onSubmit={handleSubmit(onSearch)}
                        >
                            <div className="input flex items-center">
                                <button type="submit">
                                    <FaSearch
                                        size={20}
                                        className="cursor-pointer text-slate-300"
                                    />
                                </button>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Tìm kiếm theo tên tour"
                                    className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm text-black dark:text-white">
                            <thead className="bg-gray-100 text-left dark:bg-slate-800">
                                <tr>
                                    <th className="border px-4 py-2">Tên</th>
                                    <th className="border px-4 py-2">Thời gian</th>
                                    <th className="border px-4 py-2">Mô tả</th>
                                    <th className="border px-4 py-2">Số lượng người còn trống</th>
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
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{item.tourName}</td>
                                        <td className="border px-4 py-2">{item.duration}</td>
                                        <td className="border px-4 py-2">{item.description}</td>
                                        <td className="border px-4 py-2">{item.quantity}</td>
                                        <td className="border px-4 py-2">{item.priceAdult}</td>
                                        <td className="border px-4 py-2">{item.priceChild}</td>
                                        <td className="border px-4 py-2">{item.highlights}</td>
                                        <td className="border px-4 py-2">{item.available ? "1" : "🚫"} </td>
                                        <td className="border px-4 py-2">{item.startDate}</td>
                                        <td className="border px-4 py-2">{item.endDate}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
                )}
            </div>
        </>
    );
}

export default ShowTour;
