function ShowNotifications({ showNotifications }) {
    return (
        <>
            {showNotifications && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-amber-50 shadow-lg dark:bg-slate-900 dark:text-amber-50">
                    <div className="border-b p-4 font-semibold dark:text-slate-50">Thông báo</div>
                    <ul className="max-h-60 overflow-y-auto">
                        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">🔔 Cập nhật hệ thống vào lúc 3h sáng</li>
                        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">🎉 Chào mừng bạn đến với website!</li>
                    </ul>
                </div>
            )}
        </>
    );
}
export default ShowNotifications;
