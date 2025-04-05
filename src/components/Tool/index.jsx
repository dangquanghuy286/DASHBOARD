import React from "react";
import Swal from "sweetalert2";
import icons from "../../util/icon";
const { FaCopy, FaFileExcel, FaFilePdf, FaPrint } = icons;
function CopyPrintComponent(props) {
    const { data } = props;
    const handleCopy = () => {
        // Tạo một chuỗi chứa thông tin của tất cả các tour
        const content = data
            .map(
                (t) =>
                    `Tên: ${t.tourName}, Thời gian: ${t.duration}, Mô tả: ${t.description}, Số lượng người còn trống: ${t.quantity}, Giá người lớn: ${t.priceAdult}, Giá trẻ em: ${t.priceChild}, Điểm đến: ${t.highlights.join(", ")}, Khả dụng: ${t.available ? "1" : "0"}, Ngày bắt đầu: ${t.startDate}, Ngày kết thúc: ${t.endDate}`,
            )
            .join("\n"); // Kết nối tất cả các chuỗi thông tin tour lại với nhau, mỗi tour cách nhau bằng một dấu xuống dòng (\n)

        // Sao chép chuỗi thông tin vào clipboard
        navigator.clipboard.writeText(content);

        // Hiển thị thông báo cho người dùng
        Swal.fire({
            title: "Sao chép thành công!",
            icon: "success",
            draggable: true,
        });
    };

    // Hàm xử lý khi người dùng nhấn nút in
    const handlePrint = () => {
        // Lưu lại các cột chứa nút "Sửa" và "Xóa"
        const editColumns = document.querySelectorAll(".edit-column");
        const deleteColumns = document.querySelectorAll(".delete-column");

        // Ẩn các cột chứa nút "Sửa" và "Xóa"
        editColumns.forEach((col) => (col.style.display = "none"));
        deleteColumns.forEach((col) => (col.style.display = "none"));

        // Tạo cửa sổ in
        const printWindow = window.open("", "", "width=800,height=600"); // Mở một cửa sổ mới với kích thước 800x600
        printWindow.document.write("<html><head><title>CÔNG TY MTV </title></head><body>"); // Tiêu đề
        printWindow.document.write("<h1 style='text-align: center;'>DANH SÁCH TOUR</h1>"); // Thêm tiêu đề "DANH SÁCH TOUR" vào giữa trang in
        printWindow.document.write(document.querySelector("table").outerHTML); // Lấy và chèn toàn bộ nội dung bảng vào cửa sổ in
        printWindow.document.write("<style>body { font-family: Arial, sans-serif; }</style>"); // Đặt phông chữ trang in là Arial
        printWindow.document.close(); // Đóng cửa sổ tài liệu sau khi hoàn thành việc viết nội dung
        printWindow.print(); // Gọi lệnh in trên cửa sổ mới

        // Khôi phục lại các cột đã ẩn
        editColumns.forEach((col) => (col.style.display = "")); // Hiển thị lại các cột "Sửa" bằng cách đặt display về giá trị mặc định
        deleteColumns.forEach((col) => (col.style.display = "")); // Hiển thị lại các cột "Xóa" bằng cách đặt display về giá trị mặc định
    };
    return (
        <>
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={handleCopy}
                    className="flex items-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                >
                    <FaCopy className="mr-2" />
                    Copy
                </button>
                <button
                    // onClick={handleExcel}
                    className="flex items-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                >
                    <FaFileExcel className="mr-2" />
                    Excel
                </button>
                <button
                    // onClick={handletoPdf}
                    className="flex items-center rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                >
                    <FaFilePdf className="mr-2" />
                    PDF
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                >
                    <FaPrint className="mr-2" />
                    Print
                </button>
            </div>
        </>
    );
}
// Hàm xử lý khi người dùng nhấn nút sao chép

export default CopyPrintComponent;
