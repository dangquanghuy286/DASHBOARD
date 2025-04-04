import { useState } from "react";
import photo from "@/assets/Img/admin-1.jpg"; // Ảnh mặc định
import icons from "../../util/icon";
const { FaEye, FaEyeSlash, MdOutlineAttachFile } = icons;

function Admin() {
    // State lưu ảnh tạm (khi chọn nhưng chưa cập nhật)
    const [tempImage, setTempImage] = useState(null);

    // State lưu ảnh chính thức (chỉ thay đổi khi nhấn "Cập nhật")
    const [selectedImage, setSelectedImage] = useState(photo);
    const [showPassword, setShowPassword] = useState(false);

    // State lưu thông tin admin
    const [formData, setFormData] = useState({
        name: "QuangHuy",
        email: "huydang2806@gmail.com",
        address: "Điện Bàn, Quảng Nam",
        password: "1234",
    });

    // Khi chọn ảnh mới
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setTempImage(URL.createObjectURL(event.target.files[0])); // Hiển thị ảnh mới nhưng chưa lưu
        }
    };

    // Khi nhập dữ liệu vào form
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Khi nhấn "Cập nhật"
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn form reload trang
        setSelectedImage(tempImage || selectedImage); // Lưu ảnh mới nếu có
        alert("Thông tin đã được cập nhật!"); // Thông báo thành công
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* Phần tiêu đề */}
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Thông tin ADMIN</h1>
            </div>

            {/* Nội dung chính */}
            <div className="flex flex-col items-center md:flex-row md:items-start">
                {/* Cột trái với ảnh đại diện */}
                <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
                    <div
                        className="mb-5 h-48 w-48 rounded-full border border-amber-300 bg-cover bg-center md:h-60 md:w-60"
                        style={{ backgroundImage: `url(${tempImage || selectedImage})` }}
                    ></div>

                    {/* Input file ẩn */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden border"
                        id="fileInput"
                    />

                    {/* Button để mở chọn ảnh */}
                    <label
                        htmlFor="fileInput"
                        className="mb-4 flex cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-5 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
                    >
                        <MdOutlineAttachFile className="mr-2 text-lg" /> Chọn ảnh mới
                    </label>
                </div>

                {/* Cột phải với biểu mẫu */}
                <div className="w-full p-8 md:w-1/2">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label className="lbl_title block">
                                Tên Admin <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                                onInvalid={(e) => e.target.setCustomValidity("Vui lòng nhập tên của bạn!")}
                                onInput={(e) => e.target.setCustomValidity("")}
                            />
                        </div>
                        <div>
                            <label className="lbl_title block">
                                Mật khẩu <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"} // Thay đổi kiểu input khi ẩn/hiện mật khẩu
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity("Vui lòng nhập mật khẩu!")}
                                    onInput={(e) => e.target.setCustomValidity("")}
                                />

                                <span
                                    className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái ẩn/hiện mật khẩu
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="lbl_title block">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="lbl_title block">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center">
                            <button
                                type="submit"
                                className="rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-6 py-2 text-white shadow-md transition duration-300 hover:scale-105 hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;
