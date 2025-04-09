import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import icons from "../../util/icon";
import CopyPrintComponent from "../../components/Tool";

import EntriesFilter from "../../components/Pagination";

import { getDataBookingTour } from "../../services/bookingService";
import BookingTourTable from "./BookingTable";

const { FaSearch } = icons;

function ShowBookingTour() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataBookingTour();
                const dataArray = res || [];
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

    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";
        if (!searchTerm) {
            setData(originalData);
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm);
        const filteredData = originalData.filter((tour) => {
            const tourName = tour.tourName?.toLowerCase() || "";
            const tourNameNoDiacritics = removeDiacritics(tourName);
            return tourName.includes(searchTerm) || tourNameNoDiacritics.includes(searchTermNoDiacritics);
        });

        setData(filteredData);
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý Booking</h1>
            </div>

            <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <CopyPrintComponent data={data} />
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
                            placeholder="Tìm kiếm theo tên tour"
                            className="*dark:placeholder:text-slate-400 w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                        />
                    </div>
                </form>
            </div>

            <EntriesFilter data={data}>{(currentEntries) => <BookingTourTable currentEntries={currentEntries} />}</EntriesFilter>
        </div>
    );
}

export default ShowBookingTour;
