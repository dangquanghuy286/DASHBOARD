/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getGuideById, updateGuide, uploadGuidePhoto } from "../../../services/guideService";
import GuideModal from "../GuideModal";
import EditButton from "../../Button/EditButton";
const genderOptions = [
    { displayName: "Nam", value: "MALE" },
    { displayName: "Nữ", value: "FEMALE" },
    { displayName: "Khác", value: "OTHER" },
];
function EditGuide({ item }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item || {});
    const [file, setFile] = useState(null);
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Khởi tạo dữ liệu khi item thay đổi
    useEffect(() => {
        if (item) {
            const fetchGuide = async () => {
                try {
                    const response = await getGuideById(item.guideId);
                    if (response.status !== 200) {
                        throw new Error(response.data?.message || "Failed to fetch guide");
                    }
                    setData({
                        ...response.data,
                        guideId: item.guideId,
                        isActive: response.data.isActive ?? true,
                    });
                } catch (error) {
                    console.error("Failed to fetch guide:", error);
                    setData({
                        ...item,
                        guideId: item.guideId,
                        isActive: item.isActive ?? true,
                    });
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Lỗi khi tải thông tin hướng dẫn viên",
                        text: error.message || "Vui lòng thử lại.",
                        showConfirmButton: true,
                        timer: 3000,
                    });
                }
            };
            fetchGuide();
        }
    }, [item]);

    // Mở modal
    const openModal = () => {
        setShowModal(true);
    };

    // Đóng modal
    const closeModal = () => {
        setShowModal(false);
        setFile(null);
        setIsPhotoChanged(false);
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "isActive") {
            updatedData[name] = value === "true";
        } else if (name === "age") {
            updatedData[name] = parseInt(value) || "";
        } else {
            updatedData[name] = value;
        }

        setData(updatedData);
    };

    // Xử lý thay đổi ảnh
    const handleImageChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            if (uploadedFile.size > 5 * 1024 * 1024) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Ảnh vượt quá kích thước 5MB!",
                    showConfirmButton: true,
                    timer: 3000,
                });
                return;
            }
            if (!uploadedFile.type.startsWith("image/")) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Vui lòng chọn file hình ảnh (jpg, png, gif, v.v.)!",
                    showConfirmButton: true,
                    timer: 3000,
                });
                return;
            }
            setFile(uploadedFile);
            setIsPhotoChanged(true);
        }
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!data.guideId) {
                throw new Error("Guide ID không tồn tại");
            }

            // Cập nhật thông tin hướng dẫn viên
            const guideData = {
                fullName: data.fullName,
                age: parseInt(data.age) || 0,
                gender: data.gender,
                phoneNumber: data.phoneNumber,
                databaseLink: data.databaseLink,
                gmailLink: data.gmailLink,
                isActive: data.isActive,
            };

            const guideResult = await updateGuide(data.guideId, guideData);
            if (guideResult.status !== 200) {
                throw new Error(guideResult.data?.message || "Cập nhật thông tin hướng dẫn viên thất bại");
            }

            // Cập nhật ảnh nếu có thay đổi
            if (isPhotoChanged && file) {
                const photoResult = await uploadGuidePhoto(data.guideId, file);
                if (photoResult.status !== 200) {
                    throw new Error(photoResult.data?.message || "Cập nhật ảnh thất bại");
                }
                setData((prev) => ({
                    ...prev,
                    photo: photoResult.data.photo,
                }));
                setFile(null);
                setIsPhotoChanged(false);
            }

            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật hướng dẫn viên thành công!",
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Cập nhật hướng dẫn viên thất bại",
                text: error.message || "Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Hiển thị ảnh
    const renderPhoto = () => {
        const photoUrl = file ? URL.createObjectURL(file) : data.photo;

        if (!photoUrl) {
            return <p className="text-gray-500">Chưa có ảnh. Vui lòng tải lên ảnh.</p>;
        }

        return (
            <div className="mt-2 flex flex-wrap gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded shadow">
                    <img
                        src={photoUrl}
                        alt="Ảnh hướng dẫn viên"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            console.error(`Failed to load image ${photoUrl}`);
                            e.target.src = "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png";
                        }}
                    />
                    {file && (
                        <button
                            type="button"
                            className="absolute top-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                            onClick={() => {
                                setFile(null);
                                setIsPhotoChanged(false);
                            }}
                        >
                            X
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <EditButton onClick={openModal} />
            <GuideModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                renderPhoto={renderPhoto}
                handleImageChange={handleImageChange}
                file={file}
                genderOptions={genderOptions}
                isLoading={isLoading}
            />
        </>
    );
}

export default EditGuide;
