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
        <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center">
                    {/* Chọn năm */}
                    <div className="flex min-w-[240px] flex-1 flex-col">
                        <label className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Chọn năm</label>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
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
                    <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="flex w-full min-w-[240px] flex-col">
                            <label className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Từ ngày</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                disabled={loading}
                            />
                        </div>
                        <div className="flex w-full min-w-[240px] flex-col">
                            <label className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">Đến ngày</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                min={startDate}
                                className="w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base transition-colors duration-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-700/50"
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* Nút reset */}
                {(selectedYear || startDate || endDate) && (
                    <div className="mt-4 flex min-w-[160px] justify-end sm:mt-0">
                        <button
                            onClick={handleResetFilters}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-3 text-base font-semibold text-gray-800 transition-all duration-200 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-800"
                        >
                            <IoMdRepeat className="transform text-lg transition-transform hover:rotate-90" />
                            <span>Đặt lại</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Hiển thị trạng thái filter */}
            {(selectedYear || (startDate && endDate)) && (
                <div className="mt-3 flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                    <span>Đang hiển thị dữ liệu:</span>
                    {selectedYear && <span className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">Năm {selectedYear}</span>}
                    {startDate && endDate && (
                        <span className="rounded bg-blue-100 px-2 py-1 dark:bg-blue-900">
                            {new Date(startDate).toLocaleDateString("vi-VN")} - {new Date(endDate).toLocaleDateString("vi-VN")}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default DashboardFilters;
