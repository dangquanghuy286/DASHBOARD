/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import BlogModal from "./BlogModal";

import { getBlogById, updateBlog, uploadBlogImage } from "../../services/blogService";
import EditButton from "../Button/EditButton";

function EditBlog({ item }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(item || {});
    const [file, setFile] = useState(null);
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    console.log(item);

    // Fetch blog data when item changes
    useEffect(() => {
        if (item && item.blogId !== data.blogId) {
            const fetchBlog = async () => {
                setIsFetching(true);
                try {
                    const response = await getBlogById(item.blogId);
                    if (response.status !== 200) {
                        throw new Error(response.data?.message || "Không thể tải thông tin bài viết");
                    }
                    setData({
                        ...response.data,
                        blogId: item.blogId,
                        isPublished: response.data.isPublished ?? true,
                    });
                } catch (error) {
                    console.error("Lỗi khi tải bài viết:", error);
                    setData({
                        ...item,
                        blogId: item.blogId,
                        isPublished: item.isPublished ?? true,
                    });
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Lỗi khi tải thông tin bài viết",
                        text: error.response?.data?.message || error.message || "Vui lòng thử lại.",
                        showConfirmButton: true,
                        timer: 3000,
                    });
                } finally {
                    setIsFetching(false);
                }
            };
            fetchBlog();
        }
    }, [item, data.blogId]);

    // Clean up object URLs for image preview
    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(URL.createObjectURL(file));
            }
        };
    }, [file]);

    // Open modal
    const openModal = () => {
        setShowModal(true);
    };

    // Close modal with confirmation if changes are unsaved
    const closeModal = () => {
        if (JSON.stringify(data) !== JSON.stringify(item) || isPhotoChanged) {
            Swal.fire({
                title: "Bạn có chắc chắn muốn thoát?",
                text: "Các thay đổi chưa được lưu sẽ bị mất.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Thoát",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModal(false);
                    setFile(null);
                    setIsPhotoChanged(false);
                }
            });
        } else {
            setShowModal(false);
            setFile(null);
            setIsPhotoChanged(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "isPublished") {
            updatedData[name] = value === "true";
        } else {
            updatedData[name] = value;
        }

        setData(updatedData);
    };

    // Handle image change
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!data.blogId) {
                throw new Error("Blog ID không tồn tại");
            }

            // Update blog data
            const blogData = {
                title: data.title,
                content: data.content,
                author: data.author,
                isPublished: data.isPublished,
            };

            const blogResponse = await updateBlog(data.blogId, blogData);
            if (blogResponse.status !== 200) {
                throw new Error(blogResponse.data?.message || "Cập nhật bài viết thất bại");
            }

            // Update image if changed
            if (isPhotoChanged && file) {
                const photoResponse = await uploadBlogImage(data.blogId, file);
                if (photoResponse.status !== 200) {
                    throw new Error(photoResponse.data?.message || "Cập nhật ảnh thất bại");
                }
                setData((prev) => ({
                    ...prev,
                    image: photoResponse.data.image,
                }));
                setFile(null);
                setIsPhotoChanged(false);
            }

            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật bài viết thành công!",
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Cập nhật bài viết thất bại",
                text: error.response?.data?.message || error.message || "Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Render photo preview
    const renderPhoto = () => {
        const photoUrl = file ? URL.createObjectURL(file) : data.image;

        if (!photoUrl) {
            return <p className="text-gray-500">Chưa có ảnh. Vui lòng tải lên ảnh.</p>;
        }

        return (
            <div className="mt-2 flex flex-wrap gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded shadow">
                    <img
                        src={photoUrl}
                        alt="Ảnh bài viết"
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
            <BlogModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                renderPhoto={renderPhoto}
                handleImageChange={handleImageChange}
                file={file}
                isLoading={isLoading}
                isFetching={isFetching}
            />
        </>
    );
}

export default EditBlog;
