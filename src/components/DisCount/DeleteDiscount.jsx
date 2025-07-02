import React from "react";
import DeleteButton from "../Button/DeleteButton";
import Swal from "sweetalert2";
import { deleteDiscount } from "../../services/discountService";

const DeleteDiscount = ({ item }) => {
    const handleDeleteTour = async () => {
        const confirmResult = await Swal.fire({
            title: "Bạn có chắc muốn xóa mã này không?",
            text: `Mã: ${item.description || "ID " + item.promotionId}`,
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
            const result = await deleteDiscount(item.promotionId);

            if (result.status === 204) {
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Mã giảm giá đã được xóa thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                return true;
            } else if (result.status === 404) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Mã không tồn tại",
                    text: "Không thể xóa mã này",
                    confirmButtonColor: "#d33",
                });
            } else if (result.status >= 500) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Lỗi máy chủ",
                    text: result.data.message || "Có lỗi xảy ra khi xóa mã do vấn đề cơ sở dữ liệu. Vui lòng kiểm tra lại.",
                    confirmButtonColor: "#d33",
                });
            } else {
                throw new Error("Lỗi không xác định: " + (result.data?.message || "Không có thông tin thêm"));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Vui lòng thử lại sau";
            await Swal.fire({
                position: "center",
                icon: "error",
                title: "Lỗi khi xóa mã giảm giá",
                text: errorMsg,
                confirmButtonColor: "#d33",
            });
            return false;
        }
    };

    return (
        <>
            <DeleteButton
                onDelete={handleDeleteTour}
                confirmText="Bạn có chắc muốn xóa mã này?"
                successText="Mã đã được xóa thành công"
            />
        </>
    );
};

export default DeleteDiscount;
