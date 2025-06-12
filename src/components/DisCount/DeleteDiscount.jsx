// import React from "react";
// import DeleteButton from "../Button/DeleteButton";
// import Swal from "sweetalert2";
// import { deleteDiscount } from "../../services/discountService";

// const DeleteDiscount = ({ item }) => {
//     console.log("Item:", item);

//     const handleDeleteTour = async () => {
//         // Hiển thị xác nhận trước khi xóa
//         const confirmResult = await Swal.fire({
//             title: "Bạn có chắc muốn xóa mã này không?",
//             text: `Mã: ${item.description || "ID " + item.promotionId}`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Xóa",
//             cancelButtonText: "Hủy",
//         });

//         if (!confirmResult.isConfirmed) {
//             return false;
//         }

//         try {
//             const result = await deleteDiscount(item.promotionId);

//             if (result.status === 200) {
//                 await Swal.fire({
//                     position: "center",
//                     icon: "success",
//                     title: result.data.message || "Mã giảm giá đã được xóa thành công!",
//                     showConfirmButton: false,
//                     timer: 2000,
//                 });
//                 // Reload danh sách mã giảm giá
//                 return true;
//             } else if (result.status === 404) {
//                 await Swal.fire({
//                     position: "center",
//                     icon: "error",
//                     title: "Mã không tồn tại",
//                     text: "Không thể xóa mã này",
//                     confirmButtonColor: "#d33",
//                 });
//             } else if (result.status >= 500) {
//                 await Swal.fire({
//                     position: "center",
//                     icon: "error",
//                     title: "Lỗi máy chủ",
//                     text: result.data.message || "Có lỗi xảy ra khi xóa mã do vấn đề cơ sở dữ liệu. Vui lòng kiểm tra lại.",
//                     confirmButtonColor: "#d33",
//                 });
//             } else {
//                 throw new Error(result.data.message || "Lỗi không xác định");
//             }
//         } catch (error) {
//             console.error("Error deleting discount with ID", item.promotionId, ":", error);
//             await Swal.fire({
//                 position: "center",
//                 icon: "error",
//                 title: "Lỗi khi xóa mã giảm giá",
//                 text: error.message || "Vui lòng thử lại sau",
//                 confirmButtonColor: "#d33",
//             });
//             return false;
//         }
//     };

//     return (
//         <>
//             <DeleteButton
//                 onDelete={handleDeleteTour}
//                 confirmText="Bạn có chắc muốn xóa mã này?"
//                 successText="Mã đã được xóa thành công"
//             />
//         </>
//     );
// };

// export default DeleteDiscount;
