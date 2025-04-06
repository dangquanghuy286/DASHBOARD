import React from "react";
import Swal from "sweetalert2";
import icons from "../../util/icon";
import { CSVLink, CSVDownload } from "react-csv";
const { FaCopy, FaFileExcel, FaFilePdf, FaPrint, FaFileCsv } = icons;
function CopyPrintComponent(props) {
    const { data } = props;

    // Hàm xử lý khi người dùng nhấn nút sao chép
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
        printWindow.document.write("<h1 style='text-align: center;'>DANH SÁCH TOUR</h1>"); // Thêm tiêu đề
        printWindow.document.write(document.querySelector("table").outerHTML); // Lấy và chèn toàn bộ nội dung bảng vào cửa sổ in
        printWindow.document.write("<style>body { font-family: Arial, sans-serif; }</style>");
        printWindow.document.close(); // Đóng cửa sổ tài liệu
        printWindow.print(); // Gọi lệnh in trên cửa sổ mới

        // Khôi phục lại các cột đã ẩn
        editColumns.forEach((col) => (col.style.display = "")); // Hiển thị lại các cột "Sửa" bằng cách đặt display về giá trị mặc định
        deleteColumns.forEach((col) => (col.style.display = "")); // Hiển thị lại các cột "Xóa" bằng cách đặt display về giá trị mặc định
    };

    // Hàm tạo nội dung  file CSV
    const renderCSV = () => {
        const headers = [
            "Tên",
            "Thời gian",
            "Mô tả",
            "Số lượng người còn trống",
            "Giá người lớn",
            "Giá trẻ em",
            "Điểm đến",
            "Khả dụng",
            "Ngày bắt đầu",
            "Ngày kết thúc",
        ];
        const rows = data.map((t) => [
            t.tourName,
            t.duration,
            t.description,
            t.quantity,
            t.priceAdult,
            t.priceChild,
            t.highlights.join(", "),
            t.available ? "1" : "0",
            t.startDate,
            t.endDate,
        ]);

        // Kết hợp tiêu đề cột và các dòng dữ liệu thành một mảng duy nhất
        const csv = [headers, ...rows]
            // Duyệt qua từng dòng trong bảng dữ liệu (bao gồm cả dòng tiêu đề và dữ liệu)
            .map(
                (row) =>
                    // Với mỗi dòng, duyệt qua từng ô dữ liệu
                    row
                        .map((cell) => `"${cell}"`) // Bọc từng ô dữ liệu trong dấu ngoặc kép để đảm bảo định dạng CSV
                        .join(","), // Ghép các ô dữ liệu trong một dòng thành chuỗi, cách nhau bởi dấu phẩy
            )
            .join("\n"); // Ghép tất cả các dòng lại với nhau, mỗi dòng cách nhau bằng dấu xuống dòng (\n)

        // Trả về chuỗi CSV hoàn chỉnh
        return csv;
    };
    const handletoCSV = () => {
        const csv = renderCSV(); // Gọi hàm renderCSV để tạo nội dung CSV
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Tạo một đối tượng Blob từ chuỗi CSV với kiểu MIME là text/csv
        const url = URL.createObjectURL(blob); // Tạo một URL tạm thời cho đối tượng Blob

        // Tạo một thẻ a ẩn để tải xuống file CSV
        const link = document.createElement("a");
        link.href = url; // Đặt thuộc tính href của thẻ a là URL của đối tượng Blob
        link.setAttribute("download", "tour.csv");
        document.body.appendChild(link); // Thêm thẻ a vào DOM
        link.click(); // Kích hoạt sự kiện click trên thẻ a để tải xuống file CSV
        document.body.removeChild(link); // Xóa thẻ a khỏi DOM sau khi tải xuống hoàn tất
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
                    onClick={handletoCSV}
                    className="flex items-center rounded bg-amber-300 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-400"
                >
                    <FaFileCsv className="mr-2" />
                    CSV
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

export default CopyPrintComponent;
