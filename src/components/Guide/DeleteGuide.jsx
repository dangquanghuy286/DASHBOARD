import React from "react";
import DeleteButton from "../Button/DeleteButton";
import Swal from "sweetalert2";
import { deleteGuide } from "../../services/guideService";
const DeleteGuide = ({ item }) => {
    console.log(item);

    const handleDeleteGuide = async () => {
        const confirmResult = await Swal.fire({
            title: "Bạn có chắc muốn xóa guide này không?",
            text: `Guide: ${item.fullName || "ID " + item.guideId}`,
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
            const result = await deleteGuide(item.guideId);
            if (result.status === 200) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: result.data.message || "Guide đã được xóa thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                // Reload danh sách tour
                return true;
            } else {
                throw new Error(result.data.details || result.data.error || "Lỗi không xác định");
            }
        } catch (error) {
            console.error("Error deleting guide with ID", item.guideId, ":", error);
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi khi xóa guides",
                text: error.message || "Vui lòng thử lại sau",
                confirmButtonColor: "#d33",
            });
            return false;
        }
    };
    return (
        <DeleteButton
            onDelete={handleDeleteGuide}
            confirmText="Bạn có chắc muốn xóa Guides này không?"
            successText="Guides đã được xóa thành công!"
        />
    );
};

export default DeleteGuide;
