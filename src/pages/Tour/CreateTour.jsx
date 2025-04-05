import { useState } from "react";
import icons from "../../util/icon";
import Modal from "react-modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// Giả sử bạn có API để tạo tour
import { createDataTour } from "../../services/tourService"; // Cần tạo API này

const { IoIosAdd } = icons;

function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]); // Mảng để lưu URL preview của ảnh
    const [reload, setReload] = useState(false);

    const handleReload = () => {
        setReload(!reload);
    };

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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        // Reset form khi đóng modal
        setData({
            tourName: "",
            duration: "",
            description: "",
            quantity: "",
            priceAdult: "",
            priceChild: "",
            highlights: [""],
            available: true,
            startDate: "",
            endDate: "",
            images: [],
        });
        setImagePreviews([]);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        // Chuẩn bị dữ liệu để gửi lên API
        const formData = new FormData();
        formData.append("tourName", data.tourName);
        formData.append("duration", data.duration);
        formData.append("description", data.description);
        formData.append("quantity", data.quantity);
        formData.append("priceAdult", data.priceAdult);
        formData.append("priceChild", data.priceChild);
        formData.append("highlights", JSON.stringify(data.highlights));
        formData.append("available", data.available);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);

        // Thêm từng file ảnh vào FormData
        data.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        const ketqua = await createDataTour(formData); // Gọi API tạo tour

        if (ketqua) {
            setShowModal(false);
            handleReload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tạo tour thành công!",
                showConfirmButton: false,
                timer: 5000,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Tạo tour thất bại!",
                showConfirmButton: false,
                timer: 5000,
            });
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };

    // Xử lý thay đổi cho highlights
    const handleHighlightChange = (index, value) => {
        const newHighlights = [...data.highlights];
        newHighlights[index] = value;
        setData({
            ...data,
            highlights: newHighlights,
        });
    };

    // Thêm một highlight mới
    const addHighlight = () => {
        setData({
            ...data,
            highlights: [...data.highlights, ""],
        });
    };

    // Xóa một highlight
    const removeHighlight = (index) => {
        const newHighlights = data.highlights.filter((_, i) => i !== index);
        setData({
            ...data,
            highlights: newHighlights,
        });
    };

    // Xử lý khi người dùng chọn nhiều ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Tạo URL preview cho các ảnh
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...newPreviews]);

            // Lưu file ảnh vào state
            setData({
                ...data,
                images: [...data.images, ...files],
            });
        }
    };

    // Xóa một ảnh khỏi danh sách
    const removeImage = (index) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData({
            ...data,
            images: newImages,
        });
        setImagePreviews(newPreviews);
    };

    return (
        <>
            <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-2 text-lg text-white shadow-md hover:bg-gradient-to-l focus:outline-none"
                onClick={openModal}
            >
                <IoIosAdd className="text-xl" /> Thêm Tour
            </button>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Thêm Tour"
            >
                <form
                    className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6"
                    onSubmit={handleCreate}
                >
                    <table className="w-full table-auto border-collapse">
                        <tbody>
                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Tên tour</td>
                                <td className="w-3/4">
                                    <input
                                        type="text"
                                        name="tourName"
                                        placeholder="Tên tour"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.tourName}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Thời gian</td>
                                <td className="w-3/4">
                                    <input
                                        type="text"
                                        name="duration"
                                        placeholder="Thời gian (ví dụ: 7 ngày)"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.duration}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-start py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Mô tả</td>
                                <td className="w-3/4">
                                    <textarea
                                        name="description"
                                        placeholder="Mô tả tour"
                                        className="focus:ring-opacity-50 min-h-[100px] w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.description}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Số lượng người</td>
                                <td className="w-3/4">
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Số lượng người tối đa"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.quantity}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Giá người lớn</td>
                                <td className="w-3/4">
                                    <input
                                        type="number"
                                        name="priceAdult"
                                        placeholder="Giá người lớn (USD)"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.priceAdult}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Giá trẻ em</td>
                                <td className="w-3/4">
                                    <input
                                        type="number"
                                        name="priceChild"
                                        placeholder="Giá trẻ em (USD)"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.priceChild}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-start py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Điểm nổi bật</td>
                                <td className="w-3/4 space-y-2">
                                    {data.highlights.map((highlight, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="text"
                                                placeholder={`Điểm nổi bật ${index + 1}`}
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                value={highlight}
                                                onChange={(e) => handleHighlightChange(index, e.target.value)}
                                            />
                                            {data.highlights.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => removeHighlight(index)}
                                                >
                                                    Xóa
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="mt-2 text-blue-500 hover:text-blue-700"
                                        onClick={addHighlight}
                                    >
                                        + Thêm điểm nổi bật
                                    </button>
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Khả dụng</td>
                                <td className="w-3/4">
                                    <input
                                        type="checkbox"
                                        name="available"
                                        className="h-5 w-5"
                                        checked={data.available}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Ngày bắt đầu</td>
                                <td className="w-3/4">
                                    <input
                                        type="date"
                                        name="startDate"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.startDate}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Ngày kết thúc</td>
                                <td className="w-3/4">
                                    <input
                                        type="date"
                                        name="endDate"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                        value={data.endDate}
                                    />
                                </td>
                            </tr>

                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Hình ảnh</td>
                                <td className="flex w-3/4 items-center space-x-3">
                                    <label className="flex-shrink-0">
                                        <input
                                            type="file"
                                            name="images"
                                            accept="image/*"
                                            multiple // Cho phép chọn nhiều ảnh
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        <span className="focus:ring-opacity-50 inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-2.5 font-medium text-white transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                            Chọn ảnh
                                        </span>
                                    </label>
                                </td>
                            </tr>

                            {/* Hiển thị preview các ảnh */}
                            {imagePreviews.length > 0 && (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="py-4"
                                    >
                                        <div className="flex flex-wrap gap-4">
                                            {imagePreviews.map((preview, index) => (
                                                <div
                                                    key={index}
                                                    className="relative"
                                                >
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index}`}
                                                        className="h-[100px] w-[100px] rounded-md object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-end space-x-4 py-4">
                        <button
                            type="button"
                            className="focus:ring-opacity-50 rounded-md bg-gray-400 px-5 py-2.5 font-medium text-white transition duration-200 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                            onClick={closeModal}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-5 py-2.5 font-medium text-white shadow-md hover:bg-gradient-to-l focus:outline-none"
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
