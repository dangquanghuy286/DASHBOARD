import { useEffect, useState } from "react";
import photo from "@/assets/Img/admin-1.jpg";
import icons from "../../util/icon";
import GoBack from "../../components/GoBack/Goback";
import { getCookie } from "../../helpers/cookie";
import { getDataCustomer } from "../../services/userSevice";

const { FaEye, FaEyeSlash, MdOutlineAttachFile } = icons;

function Admin() {
    const [tempImage, setTempImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(photo);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
    });

    useEffect(() => {
        const token = getCookie("token");
        const fetchApi = async () => {
            try {
                const res = await getDataCustomer();
                const currentUser = res.find((user) => user.token === token);
                if (currentUser) {
                    setFormData({
                        name: currentUser.name,
                        email: currentUser.email,
                        address: currentUser.address,
                        password: currentUser.password,
                        avatar: currentUser.avatar || "",
                    });
                    if (currentUser.avatar && currentUser.avatar.startsWith("http")) {
                        setTempImage(currentUser.avatar);
                    }
                } else {
                    alert("Người dùng không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchApi();
    }, []);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setTempImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSelectedImage(tempImage || selectedImage);
        alert("Thông tin đã được cập nhật!");
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
                    <div className="mb-5 h-40 w-40 overflow-hidden rounded-full border border-amber-300 md:h-60 md:w-60">
                        <img
                            src={tempImage || formData.avatar || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                            alt={formData.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden border"
                        id="fileInput"
                    />

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
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="lbl_title block">
                                Mật khẩu <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500"
                                    required
                                />
                                <span
                                    className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
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
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="lbl_title block">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="mt-4 flex items-center gap-3">
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
            <GoBack />
        </div>
    );
}

export default Admin;
