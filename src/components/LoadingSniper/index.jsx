function LoadingSpinner({ message = "Đang tải dữ liệu..." }) {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="text-gray-600 dark:text-gray-300">{message}</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;
