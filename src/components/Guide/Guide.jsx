import { useEffect, useState } from "react";

import GoBack from "../../components/GoBack/Goback";
import LoadingSpinner from "../../components/LoadingSniper";
import { getDataGuide } from "../../services/guideService";
import ErrorMessage from "../ErrorMessage";
import DeleteGuide from "./DeleteGuide";
import CreateGuide from "./Create/CreateGuide";
import EditGuide from "./Edit/EditGuide";

function Guide() {
    const [data, setData] = useState([]);
    // const [originalData, setOriginalData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [limit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataGuide();
                setData(res.guides || []);
            } catch (error) {
                setError("Đã xảy ra lỗi khi lấy dữ liệu hướng dẫn viên.");
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 py-6">
                <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                    <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý hướng dẫn viên</h1>
                </div>
                <div className="my-6 flex flex-col items-center gap-2.5 md:flex-row">
                    <div className="mb-4 flex w-full items-center space-x-2 sm:mb-0 sm:w-auto">
                        <CreateGuide />
                    </div>
                </div>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : error ? (
                    <div className="mb-6">
                        <ErrorMessage message={error} />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Desktop Table */}
                        <div className="hidden overflow-x-auto rounded-lg bg-white shadow-md lg:block dark:bg-gray-800">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">ID</th>
                                        <th className="px-4 py-3 font-medium">Họ và tên</th>
                                        <th className="px-4 py-3 font-medium">Tuổi</th>
                                        <th className="px-4 py-3 font-medium">Giới tính</th>
                                        <th className="px-4 py-3 font-medium">Số điện thoại</th>
                                        <th className="px-4 py-3 font-medium">Email</th>
                                        <th className="px-4 py-3 font-medium">Facebook</th>
                                        <th className="px-4 py-3 font-medium">Ảnh</th>
                                        <th className="px-4 py-3 font-medium">Trạng thái</th>
                                        <th className="px-4 py-3 font-medium"></th>
                                        <th className="px-4 py-3 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                    {data.map((guide) => (
                                        <tr
                                            key={guide.guideId}
                                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{guide.guideId}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{guide.fullName}</td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{guide.age}</td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{guide.gender === "MALE" ? "Nam" : "Nữ"}</td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                <a
                                                    href={`tel:${guide.phoneNumber}`}
                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                >
                                                    {guide.phoneNumber}
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">
                                                <a
                                                    href={`mailto:${guide.gmailLink}`}
                                                    className="break-all text-blue-600 hover:underline dark:text-blue-400"
                                                >
                                                    {guide.gmailLink}
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">
                                                <a
                                                    href={guide.databaseLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                >
                                                    Facebook
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={guide.photo}
                                                    alt={guide.fullName}
                                                    className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover dark:border-gray-600"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                        guide.isActive
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                    }`}
                                                >
                                                    {guide.isActive ? "Hoạt động" : "Không hoạt động"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                <EditGuide item={guide} />
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                <DeleteGuide item={guide} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="space-y-4 lg:hidden">
                            {data.map((guide) => (
                                <div
                                    key={guide.guideId}
                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <div className="mb-4 flex items-start space-x-4">
                                        <img
                                            src={guide.photo}
                                            alt={guide.fullName}
                                            className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-gray-200 object-cover dark:border-gray-600"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">{guide.fullName}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">ID: {guide.guideId}</p>
                                            <span
                                                className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                    guide.isActive
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                }`}
                                            >
                                                {guide.isActive ? "Hoạt động" : "Không hoạt động"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                        <div>
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Tuổi:</span>
                                            <span className="ml-2 text-gray-900 dark:text-gray-100">{guide.age}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Giới tính:</span>
                                            <span className="ml-2 text-gray-900 dark:text-gray-100">{guide.gender === "MALE" ? "Nam" : "Nữ"}</span>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Điện thoại:</span>
                                            <a
                                                href={`tel:${guide.phoneNumber}`}
                                                className="ml-2 text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {guide.phoneNumber}
                                            </a>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                                            <a
                                                href={`mailto:${guide.gmailLink}`}
                                                className="ml-2 break-all text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {guide.gmailLink}
                                            </a>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Facebook:</span>
                                            <a
                                                href={guide.databaseLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Xem trang Facebook
                                            </a>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Hành động:</span>
                                            <DeleteGuide item={guide} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                Tổng số hướng dẫn viên: <span className="text-blue-600 dark:text-blue-400">{data.length}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <GoBack />
        </div>
    );
}

export default Guide;
