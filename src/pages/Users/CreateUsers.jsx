/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import icons from "../../util/icon";
import Modal from "react-modal";
import { getRoles } from "../../services/rolesService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { createDataCustomer } from "../../services/userSevice";
import { generateToken } from "../../helpers/generateTonken";

const { IoIosAdd } = icons;

function CreateUser() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getRoles();
            setDataCategory(res);
        };
        fetchAPI();
    }, []);

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
        setData({}); // Reset data khi đóng modal
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        // Chuẩn bị dữ liệu gửi đi
        let finalData = { ...data };

        // Nếu là admin, bổ sung userId, username, password, và token
        if (data.role === "Admin") {
            finalData = {
                ...finalData,
                userId: data.userId || `admin${Date.now().toString().slice(-3)}`, // Tạo userId như "admin005"
                username: data.username || data.email, // Nếu không có username, lấy email
                password: data.password || "1234", // Mặc định password là 1234 nếu không nhập
                token: generateToken(), // Tạo token ngẫu nhiên
            };
        }

        const ketqua = await createDataCustomer(finalData);

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
        const name = e.target.name;
        const value = e.target.value;

        let updatedData = {
            ...data,
            [name]: value,
        };

        // Nếu vai trò là Admin, thêm các trường mặc định
        if (name === "role" && value === "Admin") {
            updatedData = {
                ...updatedData,
                userId: `admin${Date.now().toString().slice(-3)}`, // Tạo userId mặc định
                username: data.email || "", // Gán email làm username mặc định
                password: "1234", // Mặc định password
                token: generateToken(), // Tạo token ngay khi chọn Admin
            };
        } else if (name === "role" && value !== "Admin") {
            // Nếu chuyển từ Admin sang vai trò khác, xóa các trường không cần thiết
            const { userId, username, password, token, ...rest } = updatedData;
            updatedData = rest;
        }

        setData(updatedData);
    };

    return (
        <>
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
                    onSubmit={handleCreate}
                >
                    <table className="w-full table-auto border-collapse">
                        <tbody>
                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">ID Người dùng</td>
                                <td className="w-3/4">
                                    <input
                                        type="text"
                                        name="userId"
                                        placeholder="ID Người dùng (adminXXX)"
                                        value={data.userId || ""}
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
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
                            {dataCategory.length > 0 && (
                                <tr className="flex items-center py-3">
                                    <td className="w-1/4 py-2 font-semibold text-gray-700">Vai trò</td>
                                    <td className="w-3/4">
                                        <select
                                            name="role"
                                            className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            onChange={handleChange}
                                        >
                                            <option value="">Chọn vai trò</option>
                                            {dataCategory.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )}
                            {data.role === "Admin" && (
                                <>
                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Tên đăng nhập</td>
                                        <td className="w-3/4">
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Tên đăng nhập"
                                                value={data.username || ""}
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="flex items-center py-3">
                                        <td className="w-1/4 py-2 font-semibold text-gray-700">Mật khẩu</td>
                                        <td className="w-3/4">
                                            <input
                                                type="text"
                                                name="password"
                                                placeholder="Mật khẩu"
                                                value={data.password || "1234"}
                                                className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                </>
                            )}
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
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Email</td>
                                <td className="w-3/4">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 p-3 text-gray-600 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="flex items-center py-3">
                                <td className="w-1/4 py-2 font-semibold text-gray-700">Số điện thoại</td>
                                <td className="w-3/4">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Số điện thoại"
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
                                            className="hidden"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </td>
                            </tr>
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

export default CreateUser;
