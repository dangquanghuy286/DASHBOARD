import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import icons from "../../util/icon";
import CopyPrintComponent from "../../components/Tool";
import { getDataTour } from "../../services/tourService";
import EntriesFilter from "../../components/Pagination";
import TourTable from "./TourTable";
import GoBack from "../../components/GoBack/Goback";
import CreateTour from "../../components/Tour/Create";

const { FaSearch } = icons;

function ShowTour() {
    // State lưu trữ dữ liệu tour sau khi xử lý và dữ liệu gốc ban đầu
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    // Sử dụng react-hook-form để xử lý form tìm kiếm
    const { register, handleSubmit } = useForm();

    // Gọi API lấy dữ liệu tour khi component được mount
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataTour();
                if (res.status !== 200) {
                    throw new Error(res.data.error || "Lỗi không xác định");
                }
                console.log("res", res);

                // Đảm bảo dữ liệu hợp lệ
                const dataArray = res.data?.tours && Array.isArray(res.data.tours) ? res.data.tours : [];

                // Cập nhật availability dựa trên ngày bắt đầu
                const updatedData = dataArray.map((tour) => {
                    const startDate = tour.startDate ? new Date(tour.startDate) : null;
                    const today = new Date();

                    // Nếu ngày bắt đầu < hôm nay thì không còn khả dụng
                    const isAvailable = startDate && startDate >= today ? tour.availability : false;

                    return {
                        ...tour,
                        availability: isAvailable,
                    };
                });

                // Đảo ngược dữ liệu để hiển thị tour mới trước
                const reversedData = [...updatedData].reverse();

                // Cập nhật state
                setData(reversedData);
                setOriginalData(reversedData);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setData([]);
                setOriginalData([]);
            }
        };

        fetchApi(); // Gọi hàm khi component mount
    }, []);

    // Hàm loại bỏ dấu tiếng Việt để hỗ trợ tìm kiếm không phân biệt dấu
    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    // Xử lý tìm kiếm tour theo tên
    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";

        // Nếu không nhập gì thì hiển thị lại dữ liệu gốc
        if (!searchTerm) {
            setData(originalData);
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm);

        // Lọc dữ liệu theo tên (có và không dấu)
        const filteredData = originalData.filter((tour) => {
            const tourName = tour.title?.toLowerCase() || "";
            const tourNameNoDiacritics = removeDiacritics(tourName);
            return tourName.includes(searchTerm) || tourNameNoDiacritics.includes(searchTermNoDiacritics);
        });

        // Cập nhật kết quả tìm được
        setData(filteredData);
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            {/* Tiêu đề */}
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Tour</h1>
            </div>

            {/* Công cụ xuất dữ liệu */}
            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <CopyPrintComponent
                    data={data}
                    type="tour"
                />
            </div>

            {/* Khu vực tạo tour và tìm kiếm */}
            <div className="my-6 flex flex-col items-center gap-2.5 md:flex-row">
                <div className="mb-4 flex w-full items-center space-x-2 sm:mb-0 sm:w-auto">
                    {/* Nút tạo tour */}
                    <CreateTour />
                    {/* Form tìm kiếm */}
                    <form
                        className="inline"
                        onSubmit={handleSubmit(onSearch)}
                    >
                        <div className="input flex items-center">
                            <button
                                type="submit"
                                className="cursor-pointer"
                            >
                                <FaSearch
                                    size={20}
                                    className="text-slate-300"
                                />
                            </button>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Tìm kiếm theo tên tour"
                                className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50 dark:placeholder:text-slate-400"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Hiển thị danh sách tour có phân trang */}
            <EntriesFilter data={data}>{(currentEntries) => <TourTable currentEntries={currentEntries} />}</EntriesFilter>

            {/* Nút quay lại */}
            <div className="mb-4">
                <GoBack />
            </div>
        </div>
    );
}

export default ShowTour;
