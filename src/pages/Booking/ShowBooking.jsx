import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import icons from "../../util/icon";
import CopyPrintComponent from "../../components/Tool";
import EntriesFilter from "../../components/Pagination";
import { getDataBookingTour } from "../../services/bookingService";
import BookingTourTable from "./BookingTable";
import GoBack from "../../components/GoBack/Goback";

const { FaSearch } = icons;

function ShowBookingTour() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Page index từ 0
    const [limit] = useState(10); // 10 bản ghi mỗi trang
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [keyword, setKeyword] = useState(""); // Từ khóa tìm kiếm
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataBookingTour(currentPage + 1, limit, keyword); // API expects 1-based page
                const dataArray = res.data || [];

                setData(dataArray);
                setTotalPages(res.totalPages || 1);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setData([]);
                setTotalPages(1);
            }
        };
        fetchApi();
    }, [currentPage, limit, keyword]);

    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";
        setKeyword(searchTerm);
        setCurrentPage(0); // Reset về trang đầu
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý Booking</h1>
            </div>

            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <CopyPrintComponent
                    data={data}
                    type="booking"
                />
            </div>

            <div className="my-6 flex items-center gap-2.5">
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
                            placeholder="Tìm kiếm theo tên tour hoặc tên người dùng"
                            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50 dark:placeholder:text-slate-400"
                        />
                    </div>
                </form>
            </div>

            {/* Bảng danh sách booking tour */}
            <BookingTourTable currentEntries={data} />
            <EntriesFilter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <div className="mb-4">
                <GoBack />
            </div>
        </div>
    );
}

export default ShowBookingTour;
