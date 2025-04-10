import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
//Hàm Copy dữ liệu
export const handleCopy = (data, type) => {
    let content = "";

    if (type === "tour") {
        content = data
            .map(
                (item) =>
                    `Tên:${item.tourName}\nThời gian:${item.duration}\nMô tả:${item.description}\nSố lượng người còn trống:${item.quantity}\nGiá người lớn:${item.priceAdult}\nGiá trẻ em:${item.priceChild}\nĐiểm đến:${item.highlights.join(",")}\nKhả dụng:${item.available ? "1" : "0"}\nNgày bắt đầu:${item.startDate}\nNgày kết thúc:${item.endDate}`,
            )
            .join("\n\n");
    } else if (type === "booking") {
        content = data
            .map(
                (item) =>
                    `Tên:${item.tourName}\nThời gian:${item.duration}\nSố lượng người lớn:${item.adult}\nSố lượng trẻ em:${item.child}\nTổng tiền:${item.totalPrice}\nNgày bắt đầu:${item.startDate}\nNgày kết thúc:${item.endDate}`,
            )
            .join("\n\n");
    }
    navigator.clipboard.writeText(content);
    Swal.fire({
        title: "Sao chép thành công!",
        icon: "success",
        draggable: true,
    });
};
//Hàm in dữ liệu
export const handlePrint = (type) => {
    const editColumns = document.querySelectorAll(".edit-column");
    const deleteColumns = document.querySelectorAll(".delete-column");

    //ẨN các cột không cần thiết
    editColumns.forEach((col) => (col.style.display = "none"));
    deleteColumns.forEach((col) => (col.style.display = "none"));
    if (type === "booking") {
        const paymentColumns = document.querySelectorAll(".payment-column");
        const action = document.querySelectorAll(".action-column");
        paymentColumns.forEach((col) => (col.style.display = "none"));
        action.forEach((col) => (col.style.display = "none"));
    }

    //Tao cua so in
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>CÔNG TY MTV</title></head><body>");
    printWindow.document.write(`<h1 style='text-align:center;'>Danh sách ${type.toUpperCase()}</h1>`);
    printWindow.document.write(document.querySelector("table").outerHTML);
    printWindow.document.write(`
        <style>
        body {
            font-family: Arial, sans-serif;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        </style>
    `);
    printWindow.document.close();
    printWindow.print();

    //Sau khi in xong hiện lại các cột đã ẩn
    editColumns.forEach((col) => (col.style.display = ""));
    deleteColumns.forEach((col) => (col.style.display = ""));

    if (type === "booking") {
        const paymentColumns = document.querySelectorAll(".payment-column");
        paymentColumns.forEach((col) => (col.style.display = ""));
        const action = document.querySelectorAll(".action-column");
        action.forEach((col) => (col.style.display = ""));
    }
};
// Hàm tạo nội dung CSV
export const renderCSV = (data, type) => {
    let headers = [];
    let rows = [];

    if (type === "tour") {
        headers = [
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
        rows = data.map((t) => [
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
    } else if (type === "booking") {
        headers = [
            "Mã Booking",
            "Tên khách hàng",
            "Email",
            "Số điện thoại",
            "Địa chỉ",
            "Ngày đặt",
            "Người lớn",
            "Trẻ em",
            "Tổng tiền",
            "Trạng thái",
            "Thanh toán",
        ];
        rows = data.map((b) => [
            b.bookingId,
            b.customerName,
            b.email,
            b.phone,
            b.address,
            b.bookingDate,
            b.adults,
            b.children,
            b.totalPrice,
            b.bookingStatus,
            b.paymentStatus,
        ]);
    }

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    return csv;
};

// Hàm xuất CSV
export const handleToCSV = (data, type) => {
    const csv = renderCSV(data, type);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${type}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Hàm xuất Excel
export const handleExcel = (data, type) => {
    const rows = data.map((item) =>
        type === "tour"
            ? {
                  Tên: item.tourName,
                  "Thời gian": item.duration,
                  "Mô tả": item.description,
                  "Số lượng còn": item.quantity,
                  "Giá NL": item.priceAdult,
                  "Giá TE": item.priceChild,
                  "Điểm đến": item.highlights.join(", "),
                  "Khả dụng": item.available ? "Có" : "Không",
                  "Bắt đầu": item.startDate,
                  "Kết thúc": item.endDate,
              }
            : {
                  "Khách hàng": item.customerName,
                  Email: item.email,
                  SĐT: item.phone,
                  "Địa chỉ": item.address,
                  "Ngày đặt": item.bookingDate,
                  "Người lớn": item.adults,
                  "Trẻ em": item.children,
                  "Tổng tiền": item.totalPrice,
                  "Trạng thái booking": item.bookingStatus,
                  "Thanh toán thanh toán": item.paymentStatus,
              },
    );

    const ws = XLSX.utils.json_to_sheet(rows); //Chuyển mảng rows (chứa các object với key-value) thành một sheet Excel (worksheet).
    const wb = XLSX.utils.book_new(); //Tạo một workbook mới (file Excel trống).
    XLSX.utils.book_append_sheet(wb, ws, "Tour"); //Gắn sheet ws vào workbook wb vừa tạo.
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" }); //Chuyển workbook wb thành một mảng byte (binary array) để có thể lưu xuống file .xlsx.
    saveAs(new Blob([buf]), `${type}.xlsx`); //Tạo một Blob từ dữ liệu buf và sử dụng file-saver để tải file về máy.

    Swal.fire({
        title: "Tải thành công!",
        icon: "success",
        draggable: true,
    });
};
// Hàm xuất PDF
export const handleToPdf = (data, type) => {
    const doc = new jsPDF("landscape", "pt", "a4"); //
    const rows = data.map((item) =>
        type === "tour"
            ? [
                  item.tourName || "N/A",
                  item.duration || "N/A",
                  item.description || "N/A",
                  item.quantity || 0,
                  item.priceAdult || 0,
                  item.priceChild || 0,
                  item.highlights.join(", ") || "N/A",
                  item.available ? "Có" : "Không",
                  item.startDate || "N/A",
                  item.endDate || "N/A",
              ]
            : [
                  item.tourName || "N/A",
                  item.customerName || "N/A",
                  item.email || "N/A",
                  item.phone || "N/A",
                  item.address || "N/A",
                  item.bookingDate || "N/A",
                  item.adults || 0,
                  item.children || 0,
                  item.totalPrice || 0,
                  item.bookingStatus || "N/A",
                  item.paymentStatus || "N/A",
              ],
    );

    const headers =
        type === "tour"
            ? ["Tên", "Thời gian", "Mô tả", "Số lượng", "Giá người lớn", "Giá trẻ em", "Điểm đến", "Khả dụng", "Bắt đầu", "Kết thúc"]
            : ["Tên", "Khách hàng", "Email", "SĐT", "Địa chỉ", "Ngày đặt", "Người lớn", "Trẻ em", "Tổng tiền", "Trạng thái đặt tour", "Thanh toán"];

    autoTable(doc, {
        head: [headers],
        body: rows,
        theme: "grid", // Sử dụng theme dạng lưới
        styles: {
            font: "helvetica", // Sử dụng font Helvetica
            fontSize: 10, // Kích thước font
            textColor: [0, 0, 0], // Màu chữ (đen)
            cellPadding: 5, // Khoảng cách giữa nội dung và viền ô
        },
        headStyles: {
            fillColor: [41, 128, 185], // Màu nền tiêu đề (xanh dương)
            textColor: [255, 255, 255], // Màu chữ tiêu đề (trắng)
            fontSize: 12, // Kích thước font tiêu đề
            fontStyle: "bold", // Font chữ đậm
        },
        bodyStyles: {
            fontSize: 10, // Kích thước font nội dung
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240], // Màu nền xen kẽ (xám nhạt)
        },
        margin: { top: 40 }, // Lề trên
        didDrawPage: (data) => {
            // Thêm tiêu đề trang
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text(`Danh sách ${type === "tour" ? "Tour" : "Booking"}`, data.settings.margin.left, 30);
        },
    });

    doc.save(`${type}.pdf`); // Lưu file PDF
};
