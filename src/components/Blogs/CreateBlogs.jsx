/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Swal from "sweetalert2";
import icons from "../../util/icon";

import BlogModal from "./BlogModal";

import { createBlog, uploadBlogImage } from "../../services/blogService";
import AddButton from "../Button/CreateButton";

const { IoIosAdd } = icons;

function CreateBlog({ onBlogCreated }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        title: "",
        content: "",
        author: "",
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setShowModal(true);

    const closeModal = () => {
        setShowModal(false);
        setData({
            title: "",
            content: "",
            author: "",
        });
        setFile(null);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const blogResult = await createBlog(data);
            if (![200, 201].includes(blogResult.status)) {
                throw new Error(blogResult.data.message || "Tạo blog thất bại");
            }

            const blogId = blogResult.data.blogId;
            if (!blogId) throw new Error("Không tìm thấy blogId trong response");

            let imageUploadSuccess = true;

            if (file) {
                try {
                    const uploadResult = await uploadBlogImage(blogId, file);
                    if ([200, 201].includes(uploadResult.status)) {
                        setFile(uploadResult.data.image);
                    } else {
                        imageUploadSuccess = false;
                        throw new Error(uploadResult.data.message || "Lỗi upload ảnh");
                    }
                } catch (uploadError) {
                    imageUploadSuccess = false;
                    throw new Error("Upload ảnh thất bại: " + uploadError.message);
                }
            }

            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: imageUploadSuccess ? "success" : "warning",
                title: imageUploadSuccess ? "Tạo blog thành công!" : "Tạo blog thành công nhưng upload ảnh thất bại!",
                showConfirmButton: false,
                timer: 3000,
            });

            if (onBlogCreated) onBlogCreated();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContentChange = (content) => {
        setData((prev) => ({
            ...prev,
            content,
        }));
    };

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

    const renderPhoto = () =>
        file && (
            <div className="mt-2 flex flex-wrap gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded shadow">
                    <img
                        src={typeof file === "string" ? file : URL.createObjectURL(file)}
                        alt="Ảnh blog"
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
                text="Thêm Blog"
                icon={<IoIosAdd />}
            />
            <BlogModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleContentChange={handleContentChange}
                handleSubmit={handleCreate}
                renderPhoto={renderPhoto}
                handleImageChange={handleImageChange}
                file={file}
                isLoading={isLoading}
            />
        </>
    );
}

export default CreateBlog;
