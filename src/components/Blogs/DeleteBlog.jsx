/* eslint-disable no-unused-vars */
import React from "react";
import Swal from "sweetalert2";

import DeleteButton from "../Button/DeleteButton";
import { deleteBlog } from "../../services/blogService";

const DeleteBlog = ({ item }) => {
    console.log(item);

    const handleDeleteBlog = async () => {
        const confirmResult = await Swal.fire({
            title: "Bạn có chắc muốn xóa bài viết này không?",
            text: `Bài viết: ${item.title || "ID " + item.blogId}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });
        if (!confirmResult.isConfirmed) {
            return false;
        }

        try {
            const result = await deleteBlog(item.blogId);
            if (result.status === 200) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: result.data.message || "Bài viết đã được xóa thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                // Reload danh sách blog
                return true;
            } else {
                throw new Error(result.data.message || result.data.error || "Lỗi không xác định");
            }
        } catch (error) {
            console.error("Error deleting blog with ID", item.blogId, ":", error);
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi khi xóa bài viết",
                text: error.response?.data?.message || error.message || "Vui lòng thử lại sau",
                confirmButtonColor: "#d33",
            });
            return false;
        }
    };

    return (
        <DeleteButton
            onDelete={handleDeleteBlog}
            confirmText="Bạn có chắc muốn xóa bài viết này không?"
            successText="Bài viết đã được xóa thành công!"
        />
    );
};

export default DeleteBlog;
