function ErrorMessage({ error, isWarning = false }) {
    return (
        <div className={`rounded-md p-4 ${isWarning ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
            <div className="flex">
                <div className="ml-3">
                    <h3 className={`text-sm font-medium ${isWarning ? "text-yellow-800 dark:text-yellow-200" : "text-red-800 dark:text-red-200"}`}>
                        {isWarning ? "Cảnh báo" : "Lỗi tải dữ liệu"}
                    </h3>
                    <div className={`mt-2 text-sm ${isWarning ? "text-yellow-700 dark:text-yellow-300" : "text-red-700 dark:text-red-300"}`}>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage;
