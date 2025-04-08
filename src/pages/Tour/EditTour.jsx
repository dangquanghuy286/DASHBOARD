import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { getDataRegion, updateTour } from "../../services/tourService"; // Giả định API cập nhật tour
import { IoMdCreate } from "react-icons/io";
function EditTour({ item }) {
    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState(item || {});
    const [dataRegion, setDataRegion] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataRegion(); // Giả định API lấy danh sách khu vực
            setDataRegion(result);
        };
        fetchData();
    }, []);
    // Cấu hình style cho modal
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "80vh",
            padding: "24px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            border: "none",
            overflowY: "auto",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmResult = await Swal.fire({
            title: "BẠN CÓ MUỐN CẬP NHẬT THÔNG TIN TOUR?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "LƯU",
            denyButtonText: "KHÔNG LƯU",
        });

        if (confirmResult.isConfirmed) {
            const ketqua = await updateTour(data.tourId, data);
            if (ketqua) {
                setShowModal(false);
                Swal.fire({
                    title: "CẬP NHẬT THÀNH CÔNG",
                    icon: "success",
                    timer: 5000,
                });
            } else {
                Swal.fire({
                    title: "CẬP NHẬT THẤT BẠI",
                    icon: "error",
                    timer: 5000,
                });
            }
        } else if (confirmResult.isDenied) {
            Swal.fire("KHÔNG LƯU THAY ĐỔI", "", "info");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        // Nếu người dùng thay đổi ngày bắt đầu hoặc ngày kết thúc
        if (name === "startDate" || name === "endDate") {
            // Tạo đối tượng Date từ ngày bắt đầu và ngày kết thúc
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);

            // Kiểm tra cả hai ngày đều hợp lệ và ngày kết thúc phải sau hoặc bằng ngày bắt đầu
            if (!isNaN(start) && !isNaN(end) && end >= start) {
                // Tính số mili-giây giữa hai ngày
                const diffTime = Math.abs(end - start);

                // Chuyển mili-giây sang số ngày (làm tròn lên) và cộng thêm 1 để tính cả ngày bắt đầu và kết thúc
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                // Gán giá trị số ngày vào thuộc tính duration với đơn vị là "ngày"
                updatedData.duration = `${diffDays} ngày`;
            } else {
                // Nếu ngày không hợp lệ hoặc ngày kết thúc nhỏ hơn ngày bắt đầu thì để trống
                updatedData.duration = "";
            }
        }

        setData(updatedData);
    };

    return (
        <>
            <button
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[hsla(211,96%,62%,1)] to-[hsla(295,94%,76%,1)] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[hsla(211,96%,55%,1)] hover:to-[hsla(295,94%,65%,1)] focus:ring-2 focus:ring-purple-300 focus:outline-none"
                onClick={openModal}
            >
                <IoMdCreate className="text-xl" />
            </button>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label>Tên tour</label>
                        <input
                            type="text"
                            name="tourName"
                            value={data.tourName || ""}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Điểm đến</label>
                        <input
                            type="text"
                            name="destination"
                            value={data.destination || ""}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Thời gian</label>
                        <input
                            type="text"
                            name="duration"
                            value={data.duration || ""}
                            readOnly
                            className="w-full border bg-gray-100 p-2"
                        />
                    </div>
                    <div>
                        <label>Khu vực</label>
                        <select
                            name="region"
                            className="focus:ring-opacity-50 w-full rounded-md border p-3 transition duration-200"
                            onChange={handleChange}
                            value={data.region || ""}
                        >
                            <option value="">Chọn vai trò</option>
                            {dataRegion.map((item, index) => (
                                <option
                                    key={index}
                                    value={item.regionName}
                                >
                                    {item.regionName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Mô tả</label>
                        <textarea
                            name="description"
                            value={data.description || ""}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Số lượng</label>
                        <input
                            type="number"
                            name="quantity"
                            value={data.quantity || 0}
                            onChange={handleChange}
                            className="w-full border p-2"
                            min="0"
                        />
                    </div>
                    <div>
                        <label>Giá người lớn</label>
                        <input
                            type="number"
                            name="priceAdult"
                            value={data.priceAdult || 0}
                            onChange={handleChange}
                            className="w-full border p-2"
                            min="0"
                        />
                    </div>
                    <div>
                        <label>Giá trẻ em</label>
                        <input
                            type="number"
                            name="priceChild"
                            value={data.priceChild || 0}
                            onChange={handleChange}
                            className="w-full border p-2"
                            min="0"
                        />
                    </div>
                    <div>
                        <label>Còn trống</label>
                        <select
                            name="available"
                            value={data.available ? "true" : "false"}
                            onChange={(e) => setData((prev) => ({ ...prev, available: e.target.value === "true" }))}
                            className="w-full border p-2"
                        >
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                        </select>
                    </div>
                    <div>
                        <label>Ngày bắt đầu</label>
                        <input
                            type="date"
                            name="startDate"
                            value={data.startDate || ""}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Ngày kết thúc</label>
                        <input
                            type="date"
                            name="endDate"
                            value={data.endDate || ""}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Trạng thái</label>
                        <input
                            type="text"
                            name="status"
                            value={data.status || ""}
                            onChange={handleChange}
                            className="w-full border p-2"
                        />
                    </div>
                    <div>
                        <label>Điểm nổi bật</label>
                        <textarea
                            name="highlights"
                            value={data.highlights ? data.highlights.join("\n") : ""}
                            onChange={(e) => setData((prev) => ({ ...prev, highlights: e.target.value.split("\n") }))}
                            className="w-full border p-2"
                            rows="5"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-400 px-4 py-2 text-white"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 px-4 py-2 text-white"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default EditTour;
