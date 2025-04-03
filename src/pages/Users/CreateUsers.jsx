import { useState } from "react";
import icons from "../../util/icon";
import Modal from "react-modal";
const { IoIosAdd, FaSearch } = icons;

function CreateUser() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
        // if (name === "avatar" && value) {
        //     setAvatarPreview(value); // Lưu URL ảnh để hiển thị preview
        // }
    };
    // Hàm xử lý khi người dùng chọn ảnh từ thư mục
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         // Tạo URL cho ảnh và cập nhật preview
    //         const fileURL = URL.createObjectURL(file);
    //         setAvatarPreview(fileURL);

    //         // Lưu ảnh vào trường avatar trong state (nếu cần thiết)
    //         setData({
    //             ...data,
    //             avatarFile: file,
    //         });
    //     }
    // };
    return (
        <>
            <div className="my-6 ml-6 flex items-center justify-between">
                <div className="flex space-x-2">
                    {/* Nút Thêm Sản Phẩm */}
                    <button
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-2 text-lg text-white shadow-md hover:bg-gradient-to-l focus:outline-none"
                        onClick={openModal}
                    >
                        <IoIosAdd className="text-xl" /> Thêm người dùng
                    </button>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <form
                            className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6"
                            onSubmit={handleSubmit}
                        >
                            <table className="w-full table-auto border-collapse">
                                <tbody>
                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Tên</td>
                                        <td className="w-3/4">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Họ và Tên"
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                required
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>

                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Địa chỉ</td>
                                        <td className="w-3/4">
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Địa chỉ"
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                required
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Vai trò</td>
                                        <td className="w-3/4">
                                            <select
                                                name="role"
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                onChange={handleChange}
                                            >
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className="flex items-start py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Mô tả</td>
                                        <td className="w-3/4">
                                            <textarea
                                                name="about"
                                                placeholder="Mô tả"
                                                className="focus:ring-opacity-50 min-h-[100px] w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                required
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Khác</td>
                                        <td className="w-3/4">
                                            <input
                                                type="text"
                                                name="other"
                                                placeholder="Khác"
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                required
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Link ảnh</td>
                                        <td className="flex w-3/4 items-center space-x-3">
                                            <input
                                                type="text"
                                                name="avatar"
                                                placeholder="Ảnh đại diện URL"
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                onChange={handleChange}
                                            />
                                            <label className="flex-shrink-0">
                                                <input
                                                    type="file"
                                                    name="avatarFile"
                                                    // accept="image/*"
                                                    className="hidden"
                                                    onChange={handleChange} // Gọi hàm khi chọn ảnh
                                                />
                                                {/* <span className="focus:ring-opacity-50 inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-2.5 font-medium text-white transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                                    Chọn ảnh
                                                </span> */}
                                            </label>
                                        </td>
                                    </tr>

                                    {/* Hiển thị ảnh preview
                                    {avatarPreview && (
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="py-4 text-center"
                                            >
                                                <img
                                                    src={avatarPreview}
                                                    alt="Preview"
                                                    className="h-[50px] max-w-full rounded-md"
                                                />
                                            </td>
                                        </tr>
                                    )} */}
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

                    {/* Input Tìm Kiếm */}
                    <div className="input">
                        <FaSearch
                            size={20}
                            className="cursor-pointer text-slate-300"
                        />
                        <input
                            type="text"
                            name="search"
                            placeholder="Tìm kiếm"
                            id="search"
                            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateUser;
