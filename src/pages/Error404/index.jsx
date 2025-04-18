import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 transition-colors duration-300 dark:bg-slate-950">
            <h1 className="mb-4 text-6xl font-bold text-red-500 dark:text-red-400">404</h1>
            <p className="mb-6 text-2xl text-gray-700 dark:text-gray-300">Oops! Trang không tồn tại.</p>
            <Link
                to="/"
                className="rounded-lg px-6 py-2 text-white transition hover:opacity-90"
                style={{
                    backgroundColor: "#00c0d1",
                }}
            >
                Quay lại Trang chủ
            </Link>
        </div>
    );
}
