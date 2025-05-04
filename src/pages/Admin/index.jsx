import { useEffect, useState } from "react";
import GoBack from "../../components/GoBack/Goback";
import AdminAvatar from "./Avatar";
import AdminForm from "./Adminform";
import { getInfoAdmin } from "../../services/adminService";

function Admin() {
    const [tempImage, setTempImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        address: "",
        password: "",
        avatar: "",
    });

    useEffect(() => {
        const userIdToCheck = localStorage.getItem("user_id"); // Lấy user_id từ localStorage

        const fetchApi = async () => {
            try {
                const res = await getInfoAdmin(userIdToCheck); // Truyền user_id vào hàm
                console.log("Response from getInfoAdmin:", res);

                // Kiểm tra nếu res tồn tại và khớp với user_id (nếu API trả về user_id)
                if (res) {
                    setFormData({
                        id: res.id || "",
                        name: res.user_name || "", // Sử dụng user_name thay vì name
                        email: res.email || "",
                        address: res.address || "",
                        password: res.password || "", // Có thể không có password, cần xử lý riêng
                        avatar: res.avatar_path || "", // Sử dụng avatar_path thay vì avatar
                    });
                    if (res.avatar_path?.startsWith("http")) {
                        setTempImage(res.avatar_path);
                    }
                } else {
                    alert("Người dùng không tồn tại");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
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
                    name={formData.name}
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
