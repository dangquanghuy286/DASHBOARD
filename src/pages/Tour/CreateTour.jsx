import { useEffect, useState } from "react";
import icons from "../../util/icon";
import Modal from "react-modal";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { createDataTour, getDataRegion } from "../../services/tourService";
const { IoIosAdd } = icons;

function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);
    const [dataRegion, setDataRegion] = useState([]);
    const [files, setFiles] = useState([]);
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataRegion(); // Lấy danh sách khu vực
            setDataRegion(result);
        };
        fetchData();
    }, []);
    const handleReload = () => {
        setReload(!reload);
    };
    // const [avatarPreview, setAvatarPreview] = useState(null); // Trạng thái lưu ảnh preview
    const customStyles = {
        content: {
            top: "50%", // Đặt modal ở vị trí 50% chiều cao của màn hình
            left: "50%", // Đặt modal ở vị trí 50% chiều rộng của màn hình
            right: "auto", // Không điều chỉnh vị trí bên phải
            bottom: "auto", // Không điều chỉnh vị trí phía dưới
            marginRight: "-50%", // Giữ việc căn giữa theo chiều ngang
            transform: "translate(-50%, -50%)", // Căn giữa modal
            width: "90%", // Chiều rộng modal linh hoạt theo kích thước màn hình
            maxWidth: "600px", // Giới hạn chiều rộng của modal trên các màn hình lớn
            maxHeight: "80vh", // Giới hạn chiều cao của modal không vượt quá 80% chiều cao viewport
            padding: "24px", // Thêm không gian bên trong modal để tạo cảm giác thoải mái
            background: "#ffffff", // Nền trắng sạch sẽ
            borderRadius: "12px", // Góc mềm mại, hiện đại
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)", // Áp dụng bóng đổ nhẹ cho modal để tạo chiều sâu
            border: "none", // Loại bỏ đường viền mặc định của modal để tạo phong cách sạch sẽ
            overflowY: "auto", // Cho phép cuộn dọc nếu nội dung vượt quá chiều cao modal
            fontFamily: "'Inter', sans-serif", // Font chữ hiện đại, dễ đọc (tuỳ chọn, đảm bảo font được tải)
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền tối, bán trong suốt cho lớp phủ
            zIndex: 1000, // Đảm bảo modal luôn hiển thị trên các nội dung khác
        },
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const ketqua = await createDataTour({ ...data, timeline });

        if (ketqua) {
            setShowModal(false);
            handleReload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tạo mới thành công!",
                showConfirmButton: false,
                timer: 5000,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === "startDate" || name === "endDate") {
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);

            if (!isNaN(start) && !isNaN(end) && end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                updatedData.duration = `${diffDays} ngày`;
                setTimeline(Array.from({ length: diffDays }, () => ({ title: "", content: "" }))); // Tạo mảng rỗng với độ dài là số ngày
            } else {
                updatedData.duration = "";
                setTimeline([]);
            }
        }

        setData(updatedData);
    };
    //Ham xu ly chon anh tu file
    const handleImageChange = (e) => {
        const uploadfile = e.target.files;
        setFiles(uploadfile);

        //Luu anh vao json
        const imageUrls = [...uploadfile].map((file) => URL.createObjectURL(file));
        setData((prev) => ({ ...prev, images: imageUrls }));
    };
    //Ham in anh ra
    const renderAnh = () => {
        return [...files].map((anh, index) => (
            <div
                key={index}
                className="m-2"
            >
                <img
                    src={URL.createObjectURL(anh)}
                    alt={`Ảnh ${index + 1}`}
                    width="100"
                    className="rounded shadow"
                />
            </div>
        ));
    };
    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...timeline];
        newTimeline[index][field] = value;
        setTimeline(newTimeline);
    };

    return (
        <>
            <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6EF195] to-[#00E3FD] px-3 py-2 text-lg text-white shadow-md hover:bg-gradient-to-l focus:outline-none"
                onClick={openModal}
            >
                <IoIosAdd className="text-xl" /> Thêm tour mới
            </button>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <form
                    onSubmit={handleCreate}
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
                            className="w-full border p-3"
                            onChange={handleChange}
                            value={data.region || ""}
                        >
                            <option value="">Chọn khu vực</option>
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
                            value={data.quantity ?? ""}
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
                            value={data.priceAdult ?? ""}
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
                            value={data.priceChild ?? ""}
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
                            min={new Date().toISOString().split("T")[0]}
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
                    <div className="my-4">
                        <label>Ảnh</label>

                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="file"
                                className="inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                            >
                                Chọn ảnh
                            </label>
                            <span className="text-sm text-gray-500">{files.length > 0 ? `${files.length} ảnh đã chọn` : "Chưa chọn ảnh nào"}</span>
                        </div>

                        <input
                            type="file"
                            id="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        {renderAnh()}
                    </div>
                    {timeline.length > 0 && (
                        <div>
                            <label className="block font-semibold">Lịch trình</label>
                            {timeline.map((day, index) => (
                                <div
                                    key={index}
                                    className="mb-4 rounded border bg-gray-50 p-3 shadow-sm"
                                >
                                    <p className="font-bold text-blue-600">Ngày {index + 1}</p>
                                    <div className="mb-2">
                                        <label className="block">Tiêu đề</label>
                                        <input
                                            type="text"
                                            className="w-full border p-2"
                                            value={day.title}
                                            onChange={(e) => handleTimelineChange(index, "title", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block">Nội dung</label>
                                        <textarea
                                            className="w-full border p-2"
                                            value={day.content}
                                            onChange={(e) => handleTimelineChange(index, "content", e.target.value)}
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

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

export default CreateTour;
