import DeleteTour from "../../components/Tour/Delete";
import EditTour from "../../components/Tour/Edit";
import icons from "../../util/icon";

const { MdBlock, MdCheckCircle } = icons;

function TourTable({ currentEntries }) {
    return currentEntries?.length > 0 ? (
        <div className="overflow-x-auto">
            <table className="mb-5 w-full border text-sm text-black dark:text-white">
                <thead className="bg-gray-100 text-left dark:bg-slate-800">
                    <tr>
                        <th className="border px-4 py-2">Tên</th>
                        <th className="border px-4 py-2">Thời gian</th>
                        <th className="border px-4 py-2">Mô tả</th>
                        <th className="border px-4 py-2">Số lượng </th>
                        <th className="border px-4 py-2">Giá người lớn</th>
                        <th className="border px-4 py-2">Giá trẻ em</th>
                        <th className="border px-4 py-2">Điểm xuất phát</th>
                        <th className="border px-4 py-2">Điểm đến</th>
                        <th className="border px-4 py-2">Trạng Thái</th>
                        <th className="border px-4 py-2">Ngày bắt đầu</th>
                        <th className="border px-4 py-2">Ngày kết thúc</th>
                        <th className="edit-column border px-4 py-2 text-center">Sửa</th>
                        <th className="delete-column border px-4 py-2 text-center">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map((item, index) => (
                        <tr
                            key={item.id || index}
                            className="transition hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                            <td className="border px-4 py-2">{item.title || "N/A"}</td>
                            <td className="border px-4 py-2">{item.duration || "N/A"}</td>
                            <td className="border px-4 py-2">{item.description || "N/A"}</td>
                            <td className="border px-4 py-2">{item.quantity || "N/A"} </td>
                            <td className="border px-4 py-2">{item.price_adult || "N/A"}</td>
                            <td className="border px-4 py-2">{item.price_child || "N/A"}</td>
                            <td className="border px-4 py-2">{item.departurePoint || "N/A"}</td>
                            <td className="border px-4 py-2">{item.destination || "N/A"}</td>
                            <td className="available-column border px-4 py-2 text-center">
                                {item.availability ? (
                                    <span className="flex items-center justify-center text-green-500">
                                        <MdCheckCircle
                                            size={20}
                                            className="mr-1"
                                        />
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center text-red-500">
                                        <MdBlock
                                            size={20}
                                            className="mr-1"
                                        />
                                    </span>
                                )}
                            </td>
                            <td className="border px-4 py-2">{item.startDate || "N/A"}</td>
                            <td className="border px-4 py-2">{item.endDate || "N/A"}</td>
                            <td className="edit-column border px-4 py-2 text-center">
                                <EditTour item={item} />
                            </td>
                            <td className="delete-column border px-4 py-2 text-center">
                                <DeleteTour item={item} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
    );
}

export default TourTable;
