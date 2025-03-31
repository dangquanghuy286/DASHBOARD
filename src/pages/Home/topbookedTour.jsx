import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { getTopBooked } from "../../services/topbookedSevice";
const { FaFire } = icons;
function TopbookedTour() {
    const [domesticData, setDomesticData] = useState([]);
    const [internationalData, setInternationalData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getTopBooked();
                setDomesticData(res?.domestic || []);
                setInternationalData(res?.international || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        };
        fetchApi();
    }, []);
    return (
        <>
            <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                <div className="card-header flex">
                    <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                        <FaFire size={26} />
                    </div>
                    <p className="card-title">Tour được đặt nhiều nhất</p>
                </div>
                <div className="card-body flex gap-4 p-4">
                    <h2 className="card-title mb-4t mt-8">🏞️ Top Booked Domestic Tours</h2>
                    <table className="min-w-full table-auto border-collapse dark:text-amber-50">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Tên Tour</th>
                                <th className="border border-gray-300 px-4 py-2">Chỗ Đã Đặt</th>
                                <th className="border border-gray-300 px-4 py-2">Chỗ Trống</th>
                                <th className="border border-gray-300 px-4 py-2">Giá (VND)</th>
                                <th className="border border-gray-300 px-4 py-2">Đánh Giá</th>
                                <th className="border border-gray-300 px-4 py-2">Thời Gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domesticData.map((tour) => (
                                <tr
                                    key={tour.id}
                                    className="text-center"
                                >
                                    <td className="border border-gray-300 px-4 py-2">{tour.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.seats_booked || tour.bookings}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.seats_available || "-"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.rating}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className="card-title mt-8 mb-4">✈️ Top Booked International Tours</h2>
                    <table className="min-w-full table-auto border-collapse dark:text-amber-50">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Tên Tour</th>
                                <th className="border border-gray-300 px-4 py-2">Lượt Đặt Chỗ</th>
                                <th className="border border-gray-300 px-4 py-2">Giá (USD)</th>
                                <th className="border border-gray-300 px-4 py-2">Đánh Giá</th>
                                <th className="border border-gray-300 px-4 py-2">Thời Gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {internationalData.map((tour) => (
                                <tr
                                    key={tour.tourId}
                                    className="text-center"
                                >
                                    <td className="border border-gray-300 px-4 py-2">{tour.tourId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.tourName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.bookings}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.price}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.rating}</td>
                                    <td className="border border-gray-300 px-4 py-2">{tour.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default TopbookedTour;
