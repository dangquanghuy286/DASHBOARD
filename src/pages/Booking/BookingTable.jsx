import { useEffect, useState } from "react";
import icons from "../../util/icon";
import { confirmPaymentAndBooking } from "../../services/bookingApi"; // Thêm import hàm mới
import { Link } from "react-router-dom";
import VNPAY from "../../assets/Img/images.png";
import PayOffice from "../../assets/Img/companypay.png";
const { IoIosArrowDropdownCircle } = icons;

function BookingTourTable({ currentEntries }) {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [bookingData, setBookingData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Current entries in BookingTourTable:", currentEntries);
        if (currentEntries && Array.isArray(currentEntries)) {
            setBookingData(currentEntries);
        } else {
            console.warn("Current entries không phải là mảng:", currentEntries);
            setBookingData([]);
        }
    }, [currentEntries]);

    const handleConfirmBooking = async (bookingId) => {
        setIsLoading(true);
        try {
            const booking = bookingData.find((b) => b.booking_id === bookingId);
            if (!booking) throw new Error("Không tìm thấy booking");

            // Gọi API confirm-payment-and-booking
            const response = await confirmPaymentAndBooking(bookingId);

            if (response.status !== 200) {
                throw new Error(response.data || "Lỗi khi xác nhận thanh toán và booking");
            }

            // Cập nhật trạng thái trong giao diện
            const updatedBookingData = bookingData.map((b) =>
                b.booking_id === bookingId ? { ...b, booking_status: "CONFIRMED", payment_status: "COMPLETED" } : b,
            );

            setBookingData(updatedBookingData);
            setDropdownOpen(null);
            alert("Xác nhận booking thành công!");
        } catch (error) {
            console.error("Error confirming booking:", error);
            alert("Lỗi khi xác nhận booking: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const translateStatus = (status, type) => {
        if (type === "booking") {
            switch (status) {
                case "PENDING":
                    return "Chưa xác nhận";
                case "CONFIRMED":
                    return "Đã xác nhận";
                case "CANCELLED":
                    return "Đã hủy";
                default:
                    return status || "Không xác định";
            }
        } else if (type === "payment") {
            switch (status) {
                case "PENDING":
                    return "Chưa thanh toán";
                case "PAID":
                    return "Đã thanh toán";
                case "COMPLETED":
                    return "Đã thanh toán";
                default:
                    return status || "Không xác định";
            }
        }
        return status;
    };

    return (
        <div>
            {bookingData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="mb-5 min-w-full border text-sm text-black dark:text-white">
                        <thead className="bg-gray-100 text-left dark:bg-slate-800">
                            <tr>
                                <th className="border px-4 py-2">Tên Tour</th>
                                <th className="border px-4 py-2">Khách hàng</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Số điện thoại</th>
                                <th className="border px-4 py-2">Địa chỉ</th>
                                <th className="border px-4 py-2">Ngày đặt</th>
                                <th className="border px-4 py-2">Người lớn</th>
                                <th className="border px-4 py-2">Trẻ em</th>
                                <th className="border px-4 py-2">Tổng tiền</th>
                                <th className="border px-4 py-2">Trạng thái booking</th>
                                <th className="border px-4 py-2">Phương thức thanh toán</th>
                                <th className="border px-4 py-2">Trạng thái thanh toán</th>
                                <th className="border px-4 py-2 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.map((item, index) => {
                                const badgeClass =
                                    "inline-block min-w-[120px] text-center px-2 fidefaut py-1 text-xs text-white rounded font-semibold";

                                return (
                                    <tr
                                        key={item.booking_id || index} // Sử dụng booking_id làm key
                                        className="transition hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <td className="border px-4 py-2">{item.title || "Chưa cập nhật"}</td>
                                        <td className="border px-4 py-2">{item.full_name || "Không có tên"}</td>
                                        <td className="border px-4 py-2">{item.email || "Không có email"}</td>
                                        <td className="border px-4 py-2">{item.phone_number || "Không có số"}</td>
                                        <td className="border px-4 py-2">{item.address || "Không có địa chỉ"}</td>
                                        <td className="border px-4 py-2">
                                            {item.created_at ? new Date(item.created_at).toLocaleDateString("vi-VN") : "Không có ngày"}
                                        </td>
                                        <td className="border px-4 py-2">{item.num_adults || 0}</td>
                                        <td className="border px-4 py-2">{item.num_children || 0}</td>
                                        <td className="border px-4 py-2">{(item.total_price || 0).toLocaleString("vi-VN")} VNĐ</td>
                                        <td className="border px-4 py-2 text-center">
                                            <span
                                                className={`${badgeClass} ${
                                                    item.booking_status === "CONFIRMED"
                                                        ? "bg-green-500"
                                                        : item.booking_status === "PENDING"
                                                          ? "bg-yellow-500"
                                                          : "bg-gray-500"
                                                }`}
                                            >
                                                {translateStatus(item.booking_status, "booking")}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {item.payment_method ? (
                                                item.payment_method === "VNPAY" ? (
                                                    <img
                                                        src={VNPAY}
                                                        alt="VNPAY"
                                                        className="mx-auto h-12 w-12 rounded-full"
                                                    />
                                                ) : item.payment_method === "Tại văn phòng" ? (
                                                    <img
                                                        src={PayOffice}
                                                        alt="Tại văn phòng"
                                                        className="mx-auto h-12 w-12 rounded-full"
                                                    />
                                                ) : (
                                                    item.payment_method
                                                )
                                            ) : (
                                                "Chưa xác định"
                                            )}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <span
                                                className={`${badgeClass} ${
                                                    item.payment_status === "PAID" || item.payment_status === "COMPLETED"
                                                        ? "bg-green-500"
                                                        : item.payment_status === "PENDING" || !item.payment_status
                                                          ? "bg-red-500"
                                                          : "bg-gray-500"
                                                }`}
                                            >
                                                {translateStatus(item.payment_status, "payment")}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            <div className="relative flex items-center justify-center">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => setDropdownOpen(dropdownOpen === item.booking_id ? null : item.booking_id)}
                                                    disabled={isLoading}
                                                >
                                                    <IoIosArrowDropdownCircle size={24} />
                                                </button>
                                                {dropdownOpen === item.booking_id && (
                                                    <div className="absolute top-full right-0 z-10 mt-2 min-w-[140px] rounded border bg-white text-left shadow-md">
                                                        {item.booking_status === "PENDING" && (
                                                            <button
                                                                className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50"
                                                                onClick={() => handleConfirmBooking(item.booking_id)}
                                                                disabled={isLoading}
                                                            >
                                                                ✅ Xác nhận
                                                            </button>
                                                        )}
                                                        <Link to={`/booking/${item.booking_id}`}>
                                                            <button className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50">
                                                                📄 Xem chi tiết
                                                            </button>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
            )}
            {isLoading && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
                    <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
}

export default BookingTourTable;
