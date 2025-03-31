import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getTourRecent } from "../../services/tourrecentService";

const { FaRocket } = icons;

function TourRecent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getTourRecent();
                setData(res || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu tour:", error);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
            <div className="card-header flex">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                    <FaRocket size={26} />
                </div>
                <p className="card-title">Tour mới</p>
            </div>
            <div className="card-body flex gap-4 p-4">
                <h2 className="card-title mb-4 text-sm font-bold">📋 Thông Tin Đặt Tour</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px] table-auto border-collapse border border-gray-300 text-sm dark:text-amber-50">
                        <thead>
                            <tr className="bg-blue-100 text-black">
                                <th className="border border-gray-300 px-2 py-1">ID</th>
                                <th className="border border-gray-300 px-2 py-1">Khách Hàng</th>
                                <th className="border border-gray-300 px-2 py-1">Tên Tour</th>
                                <th className="border border-gray-300 px-2 py-1">Giá (VND)</th>
                                <th className="border border-gray-300 px-2 py-1">Trạng Thái</th>
                                <th className="border border-gray-300 px-2 py-1">Thanh Toán</th>
                                <th className="border border-gray-300 px-2 py-1">Khu Vực</th>
                                <th className="border border-gray-300 px-2 py-1">Ngày Đặt</th>
                                <th className="border border-gray-300 px-2 py-1">Email</th>
                                <th className="border border-gray-300 px-2 py-1">SĐT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((tour) => (
                                    <tr
                                        key={tour.id}
                                        className="text-center"
                                    >
                                        <td className="border border-gray-300 px-2 py-1">{tour.id}</td>
                                        <td className="border border-gray-300 px-2 py-1">{tour.customer_name}</td>
                                        <td className="max-w-[100px] truncate border border-gray-300 px-2 py-1">{tour.tour_name}</td>
                                        <td className="border border-gray-300 px-2 py-1">{tour.total_price.toLocaleString()}</td>
                                        <td
                                            className={`border border-gray-300 px-2 py-1 ${tour.status === "Chưa xác nhận" ? "text-red-500" : "text-green-500"}`}
                                        >
                                            {tour.status}
                                        </td>
                                        <td className="border border-gray-300 px-2 py-1">{tour.payment_method}</td>
                                        <td className="border border-gray-300 px-2 py-1">{tour.location}</td>
                                        <td className="border border-gray-300 px-2 py-1">{new Date(tour.booking_date).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-2 py-1 text-blue-500 underline">{tour.user_email}</td>
                                        <td className="border border-gray-300 px-2 py-1 text-green-500">{tour.user_phone}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="py-2 text-center text-gray-500"
                                    >
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TourRecent;
