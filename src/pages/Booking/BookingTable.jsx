import { useState } from "react";
import icons from "../../util/icon";
const { IoIosArrowDropdownCircle } = icons;

function BookingTourTable({ currentEntries }) {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const handleConfirmBooking = (bookingId) => {
        // Gọi API hoặc xử lý xác nhận ở đây
        console.log("Xác nhận booking: ", bookingId);
        setDropdownOpen(null); // Đóng dropdown sau khi xác nhận
    };

    const handleViewDetails = (bookingId) => {
        // Xử lý xem chi tiết booking
        console.log("Xem chi tiết booking: ", bookingId);
    };

    return currentEntries?.length > 0 ? (
        <div className="overflow-x-auto">
            <table className="mb-5 min-w-full border text-sm text-black dark:text-white">
                <thead className="bg-gray-100 text-left dark:bg-slate-800">
                    <tr>
                        <th className="border px-4 py-2">Tên</th>
                        <th className="border px-4 py-2">Khách hàng</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Số điện thoại</th>
                        <th className="border px-4 py-2">Địa chỉ</th>
                        <th className="border px-4 py-2">Ngày đặt</th>
                        <th className="border px-4 py-2">Người lớn</th>
                        <th className="border px-4 py-2">Trẻ em</th>
                        <th className="border px-4 py-2">Tổng tiền</th>
                        <th className="border px-4 py-2">Trạng thái booking</th>
                        <th className="border px-4 py-2">Thanh toán</th>
                        <th className="border px-4 py-2">Trạng thái</th>
                        <th className="action-column border px-4 py-2 text-center">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map((item, index) => {
                        const badgeClass = "inline-block min-w-[120px] text-center px-2 py-1 text-xs text-white rounded font-semibold";

                        return (
                            <tr
                                key={index}
                                className="transition hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                <td className="border px-4 py-2">{item.tourName}</td>
                                <td className="border px-4 py-2">{item.customerName}</td>
                                <td className="border px-4 py-2">{item.email}</td>
                                <td className="border px-4 py-2">{item.phone}</td>
                                <td className="border px-4 py-2">{item.address}</td>
                                <td className="border px-4 py-2">{item.bookingDate}</td>
                                <td className="border px-4 py-2">{item.adults}</td>
                                <td className="border px-4 py-2">{item.children}</td>
                                <td className="border px-4 py-2">{item.totalPrice.toLocaleString("vi-VN")} VNĐ</td>

                                {/* Trạng thái booking */}
                                <td className="border px-4 py-2 text-center">
                                    <span
                                        className={`${badgeClass} ${
                                            item.bookingStatus === "Đã hoàn thành"
                                                ? "bg-green-500"
                                                : item.bookingStatus === "Chưa xác nhận"
                                                  ? "bg-yellow-500"
                                                  : "bg-gray-500"
                                        }`}
                                    >
                                        {item.bookingStatus}
                                    </span>
                                </td>

                                {/* Thanh toán */}
                                <td className="border px-4 py-2 text-center">
                                    {item.paymentMethod ? (
                                        <img
                                            src={item.paymentMethod}
                                            alt={item.paymentMethod}
                                            className="mx-auto h-12 w-12 rounded-full"
                                        />
                                    ) : (
                                        item.paymentMethod
                                    )}
                                </td>

                                {/* Trạng thái thanh toán */}
                                <td className="border px-4 py-2 text-center">
                                    <span
                                        className={`${badgeClass} ${
                                            item.paymentStatus === "Đã thanh toán"
                                                ? "bg-green-500"
                                                : item.paymentStatus === "Chưa thanh toán"
                                                  ? "bg-red-500"
                                                  : "bg-gray-500"
                                        }`}
                                    >
                                        {item.paymentStatus}
                                    </span>
                                </td>

                                <td className="action-column border px-4 py-2 text-center">
                                    <div className="relative flex items-center justify-center">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() => setDropdownOpen(dropdownOpen === item.bookingId ? null : item.bookingId)}
                                        >
                                            <IoIosArrowDropdownCircle size={24} />
                                        </button>

                                        {dropdownOpen === item.bookingId && (
                                            <div className="absolute top-full z-10 mt-2 min-w-[140px] rounded border bg-white text-left shadow-md right-0">
                                                {/* Nếu trạng thái là "Chưa xác nhận" thì hiển thị tùy chọn xác nhận */}
                                                {item.bookingStatus === "Chưa xác nhận" && (
                                                    <button
                                                        className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50"
                                                        onClick={() => handleConfirmBooking(item.bookingId)}
                                                    >
                                                        ✅ Xác nhận
                                                    </button>
                                                )}

                                                {/* Xem chi tiết luôn có */}
                                                <button
                                                    className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
                                                    onClick={() => handleViewDetails(item.bookingId)}
                                                >
                                                    📄 Xem chi tiết
                                                </button>
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
    );
}

export default BookingTourTable;