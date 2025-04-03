import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import icons from "../../util/icon";
import { deleteUser } from "../../services/customerSevice";
import { useState } from "react";
const { MdDelete } = icons;
function DeleteUser(props) {
    const { user } = props;
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
            const data = await deleteUser(user.id);
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
                className="flex h-12 w-full items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                onClick={handleDelete} // Thay handleDelete bằng hàm xóa của bạn
            >
                <MdDelete className="mr-2 text-lg" /> Xóa
            </button>
        </>
    );
}
export default DeleteUser;
