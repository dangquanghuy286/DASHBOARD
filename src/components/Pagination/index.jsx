// src/components/Pagination.jsx
import { useState } from "react";

function EntriesFilter({ data, children }) {
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5;

    const totalPages = Math.ceil(data.length / entriesPerPage);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full">
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
