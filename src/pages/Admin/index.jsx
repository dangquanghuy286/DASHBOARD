import { useEffect, useState } from "react";

import { getDataUserById } from "../../services/userSevice";
import GoBack from "../../components/GoBack/Goback";
import AdminAvatar from "./Avatar";
import AdminForm from "./Adminform";

function Admin() {
    const [tempImage, setTempImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        password: "",
        confirm_password: "",
        avatar: "",
    });

    useEffect(() => {
        const userId = localStorage.getItem("user_id");

        const fetchApi = async () => {
            try {
                if (!userId) {
                    alert("Không tìm thấy ID người dùng.");
                    return;
                }

                const res = await getDataUserById(userId);

                if (res) {
                    setFormData({
                        user_name: res.user_name || "",
                        email: res.email || "",
                        password: res.password || "",
                        confirm_password: res.confirm_password || "",
                        avatar: res.avatar || "",
                    });

                    if (res.avatar?.startsWith("http")) {
                        setTempImage(res.avatar);
                    }
                } else {
                    alert("Người dùng không tồn tại.");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchApi();
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setTempImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectedImage(tempImage || selectedImage);
        alert("Thông tin đã được cập nhật!");
        // TODO: gọi API cập nhật nếu cần
    };

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            <div className="flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Thông tin ADMIN</h1>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-start">
                <AdminAvatar
                    tempImage={tempImage}
                    avatarUrl={formData.avatar}
                    name={formData.user_name}
                    handleImageChange={handleImageChange}
                />
                <AdminForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            </div>
            <GoBack />
        </div>
    );
}

export default Admin;
