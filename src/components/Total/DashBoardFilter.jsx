import icons from "../../util/icon";
const { FaChartLine, IoMdRepeat } = icons;

function DashboardFilters({
    years,
    selectedYear,
    startDate,
    endDate,
    loading,
    handleYearChange,
    handleStartDateChange,
    handleEndDateChange,
    handleResetFilters,
}) {
    return (
        <div className="space-y-3">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {/* Chọn năm */}
                    <div className="flex max-w-[250px] min-w-[160px] flex-1 flex-col">
                        <label className="mb-1 text-xs font-semibold text-gray-800 sm:text-sm dark:text-gray-200">Chọn năm</label>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-2 py-1.5 text-xs transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:px-3 sm:py-2 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                            disabled={loading}
                        >
                            <option value="">Tất cả thời gian</option>
                            {years.map((year) => (
                                <option
                                    key={year}
                                    value={year}
                                    className="dark:bg-slate-800"
                                >
                                    Năm {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chọn khoảng ngày */}
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
                        <div className="flex max-w-[250px] min-w-[160px] flex-1 flex-col">
                            <label className="mb-1 text-xs font-semibold text-gray-800 sm:text-sm dark:text-gray-200">Từ ngày</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="w-full rounded-lg border-2 border-gray-200 bg-white px-2 py-1.5 text-xs transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:px-3 sm:py-2 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                disabled={loading}
                            />
                        </div>
                        <div className="flex max-w-[250px] min-w-[160px] flex-1 flex-col">
                            <label className="mb-1 text-xs font-semibold text-gray-800 sm:text-sm dark:text-gray-200">Đến ngày</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                min={startDate}
                                className="w-full rounded-lg border-2 border-gray-200 bg-white px-2 py-1.5 text-xs transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none sm:px-3 sm:py-2 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* Nút reset */}
                {(selectedYear || startDate || endDate) && (
                    <div className="flex min-w-[120px] justify-end">
                        <button
                            onClick={handleResetFilters}
                            disabled={loading}
                            className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:py-2 sm:text-sm dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-800"
                        >
                            <IoMdRepeat className="transform text-sm transition-transform hover:rotate-90 sm:text-base" />
                            <span>Đặt lại</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Hiển thị trạng thái filter */}
            {(selectedYear || (startDate && endDate)) && (
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-blue-600 sm:text-xs dark:text-blue-400">
                    <span>Đang hiển thị dữ liệu:</span>
                    {selectedYear && <span className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900">Năm {selectedYear}</span>}
                    {startDate && endDate && (
                        <span className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900">
                            {new Date(startDate).toLocaleDateString("vi-VN")} - {new Date(endDate).toLocaleDateString("vi-VN")}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default DashboardFilters;
