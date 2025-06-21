/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createGuide, uploadGuidePhoto } from "../../../services/guideService";
import GuideModal from "../GuideModal";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

// Danh sách giới tính cố định
const genderOptions = [
    { displayName: "Nam", value: "MALE" },
    { displayName: "Nữ", value: "FEMALE" },
    { displayName: "Khác", value: "OTHER" },
];

function CreateGuide({ onGuideCreated }) {
    // Trạng thái hiển thị modal
    const [showModal, setShowModal] = useState(false);
    // Trạng thái dữ liệu hướng dẫn viên
    const [data, setData] = useState({
        fullName: "",
        age: "",
        gender: "",
        phoneNumber: "",
        databaseLink: "",
        gmailLink: "",
        isActive: true,
    });
    // Trạng thái file ảnh
    const [file, setFile] = useState(null);
    // Trạng thái đang loading
    const [isLoading, setIsLoading] = useState(false);

    // Hàm mở modal
    const openModal = () => setShowModal(true);

    // Hàm đóng modal và reset dữ liệu
    const closeModal = () => {
        setShowModal(false);
        setData({
            fullName: "",
            age: "",
            gender: "",
            phoneNumber: "",
            databaseLink: "",
            gmailLink: "",
            isActive: true,
        });
        setFile(null);
    };

    // Hàm xử lý tạo hướng dẫn viên
    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Gửi request tạo hướng dẫn viên
            const guideResult = await createGuide(data);
            if (![200, 201].includes(guideResult.status)) {
                throw new Error(guideResult.data.message || "Tạo hướng dẫn viên thất bại");
            }

            const guideId = guideResult.data.guideId;
            if (!guideId) throw new Error("Không tìm thấy guideId trong response");

            let imageUploadSuccess = true;

            // Nếu có file ảnh, thực hiện upload
            if (file) {
                try {
                    const uploadResult = await uploadGuidePhoto(guideId, file);
                    if ([200, 201].includes(uploadResult.status)) {
                        setFile(uploadResult.data.photo);
                    } else {
                        imageUploadSuccess = false;
                        throw new Error(uploadResult.data.message || "Lỗi upload ảnh");
                    }
                } catch (uploadError) {
                    imageUploadSuccess = false;
                    throw new Error("Upload ảnh thất bại: " + uploadError.message);
                }
            }

            // Thông báo kết quả
            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: imageUploadSuccess ? "success" : "warning",
                title: imageUploadSuccess ? "Tạo hướng dẫn viên thành công!" : "Tạo hướng dẫn viên thành công nhưng upload ảnh thất bại!",
                showConfirmButton: false,
                timer: 3000,
            });

            if (onGuideCreated) onGuideCreated();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.message || "Có lỗi xảy ra",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: name === "isActive" ? value === "true" : name === "age" ? parseInt(value) || "" : value,
        }));
    };

    // Xử lý chọn ảnh
    const handleImageChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            if (uploadedFile.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Ảnh phải nhỏ hơn 5MB",
                    confirmButtonColor: "#d33",
                });
                return;
            }
            if (!uploadedFile.type.startsWith("image/")) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "File phải là ảnh (jpg, png, gif, ...)",
                    confirmButtonColor: "#d33",
                });
                return;
            }
            setFile(uploadedFile);
        }
    };

    // Hiển thị ảnh đã chọn
    const renderPhoto = () =>
        file && (
            <div className="mt-2 flex flex-wrap gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded shadow">
                    <img
                        src={typeof file === "string" ? file : URL.createObjectURL(file)}
                        alt="Ảnh hướng dẫn viên"
                        className="h-full w-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md hover:bg-red-600"
                        title="Xóa ảnh"
                    >
                        ×
                    </button>
                </div>
            </div>
        );

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm Hướng Dẫn Viên"
                icon={<IoIosAdd />}
            />
            <GuideModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleSubmit={handleCreate}
                renderPhoto={renderPhoto}
                handleImageChange={handleImageChange}
                file={file}
                genderOptions={genderOptions}
                isLoading={isLoading}
            />
        </>
    );
}

export default CreateGuide;
