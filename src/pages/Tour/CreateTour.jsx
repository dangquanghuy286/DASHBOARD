import { useEffect, useState } from "react";
import icons from "../../util/icon";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { createDataTour, getDataRegion, getDataTour } from "../../services/tourService";
const { IoIosAdd } = icons;

function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);
    const [dataRegion, setDataRegion] = useState([]);
    const [files, setFiles] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [existingTours, setExistingTours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const regions = await getDataRegion();
            setDataRegion(regions);
            const tours = await getDataTour();
            setExistingTours(tours);
        };
        fetchData();
    }, []);

    const handleReload = () => setReload(!reload);

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            padding: "24px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            border: "none",
            overflowY: "auto",
            fontFamily: "'Inter', sans-serif",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        // Kiểm tra tên tour đã tồn tại chưa
        const isDuplicate = existingTours.some((tour) => tour.tourName.toLowerCase().trim() === data.tourName?.toLowerCase().trim());

        if (isDuplicate) {
            Swal.fire({
                icon: "error",
                title: "Tour đã tồn tại",
                text: "Vui lòng chọn tên tour khác.",
                confirmButtonColor: "#d33",
            });
            return;
        }

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
                setTimeline(Array.from({ length: diffDays }, () => ({ title: "", content: "" })));
            } else {
                updatedData.duration = "";
                setTimeline([]);
            }
        }

        setData(updatedData);
    };

    const handleImageChange = (e) => {
        const uploadfile = e.target.files;
        if (!uploadfile) return;

        setFiles(uploadfile);
    };

    const renderAnh = () =>
        [...files].map((anh, index) => (
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

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...timeline];
        newTimeline[index][field] = value;
        setTimeline(newTimeline);
    };

    return (
        <>
            <button
                className="flex min-w-[180px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6EF195] to-[#00E3FD] px-4 py-2 text-base text-white shadow-md hover:bg-gradient-to-l focus:outline-none"
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
