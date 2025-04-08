import { useState } from "react";

function EntriesFilter({ data, children }) {
    // Khởi tạo state lưu trang hiện tại, mặc định là trang 1
    const [currentPage, setCurrentPage] = useState(1);

    // Khởi tạo state lưu số lượng bản ghi trên mỗi trang, mặc định là 5
    const [entriesPerPage, setEntriesPerPage] = useState(50);

    // Tính tổng số trang dựa trên độ dài của dữ liệu chia cho số lượng bản ghi mỗi trang
    const totalPages = Math.ceil(data.length / entriesPerPage);

    // Tính chỉ số của phần tử cuối cùng trên trang hiện tại
    const indexOfLastEntry = currentPage * entriesPerPage;

    // Tính chỉ số của phần tử đầu tiên trên trang hiện tại
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

    // Cắt mảng dữ liệu để lấy ra các phần tử thuộc trang hiện tại
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

    // Hàm xử lý khi người dùng chuyển sang một trang khác
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Cập nhật lại số trang hiện tại
    };

    // Hàm xử lý khi người dùng thay đổi số lượng bản ghi/trang
    const handleEntriesPerPageChange = (e) => {
        setEntriesPerPage(Number(e.target.value)); // Cập nhật số bản ghi mới/trang
        setCurrentPage(1); // Reset về trang đầu tiên để tránh lỗi hiển thị dữ liệu
    };

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center gap-2">
                <label
                    htmlFor="entriesPerPage"
                    className="text-sm text-gray-700 dark:text-white"
                >
                    Hiển thị:
                </label>
                <select
                    id="entriesPerPage"
                    value={entriesPerPage}
                    onChange={handleEntriesPerPageChange}
                    className="rounded border border-gray-300 p-1 text-sm dark:bg-slate-800 dark:text-white"
                >
                    <option value={5}>5</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>
                <span className="text-sm text-gray-700 dark:text-white"> Tour</span>
            </div>

            {children(currentEntries)}

            <div className="mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`rounded px-3 py-1 ${
                            currentPage === number ? "bg-blue-600 text-white" : "bg-gray-200 text-black dark:bg-slate-600 dark:text-white"
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EntriesFilter;
