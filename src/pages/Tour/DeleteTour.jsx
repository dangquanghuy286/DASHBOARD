import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import icons from "../../util/icon";

import { useState } from "react";
import { deleteTour } from "../../services/tourService";
const { MdDelete } = icons;
function DeleteTour(props) {
    const { item } = props;
    const [reload, setReload] = useState(false);
    const handleReload = () => {
        setReload(!reload);
    };
    // Hàm handleDelete sử dụng async/await
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Bạn có chắc muốn xóa không?",
            text: "Không thể quay lại sau khi xóa!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vẫn xóa!",
            cancelButtonText: "Hủy",
        });

        // Kiểm tra nếu người dùng xác nhận xóa
        if (result.isConfirmed) {
            const data = await deleteTour(item.id);
            if (data) {
                handleReload(); // Reload lại danh sách sau khi xóa thành công
                Swal.fire({
                    title: "Đã xóa thành công!",
                    text: "Sản phẩm đã được xóa.",
                    icon: "success",
                    timer: 5000,
                });
            }
        }
    };
    return (
        <>
            <button
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[hsla(350,93%,61%,1)] to-[hsla(8,98%,59%,1)] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-[hsla(350,93%,55%,1)] hover:to-[hsla(8,98%,50%,1)] focus:ring-2 focus:ring-red-400 focus:outline-none"
                onClick={handleDelete}
            >
                <MdDelete className="text-lg" /> {/* Biểu tượng sẽ căn giữa mà không cần margin */}
            </button>
        </>
    );
}
export default DeleteTour;
