/* eslint-disable no-unused-vars */
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    <div className="hidden overflow-x-auto lg:block">
                        <table className="mb-5 w-full border text-sm text-black dark:text-white">
                            <thead className="bg-gray-100 text-left dark:bg-slate-800">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Họ và tên</th>
                                    <th className="border px-4 py-2">Tuổi</th>
                                    <th className="border px-4 py-2">Giới tính</th>
                                    <th className="border px-4 py-2">Số điện thoại</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Facebook</th>
                                    <th className="border px-4 py-2">Ảnh</th>
                                    <th className="border px-4 py-2">Trạng thái</th>
                                    <th className="border px-4 py-2"></th>
                                    <th className="border px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {data.map((guide) => (
                                    <tr
                                        key={guide.guideId}
                                        className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td className="border px-4 py-2">{guide.guideId}</td>
                                        <td className="border px-4 py-2">{guide.fullName}</td>
                                        <td className="border px-4 py-2">{guide.age}</td>
                                        <td className="border px-4 py-2">{guide.gender === "MALE" ? "Nam" : "Nữ"}</td>
                                        <td className="border px-4 py-2">
                                            <a
                                                href={`tel:${guide.phoneNumber}`}
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {guide.phoneNumber}
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <a
                                                href={`mailto:${guide.gmailLink}`}
                                                className="break-all text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {guide.gmailLink}
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <a
                                                href={guide.databaseLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Facebook
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={guide.photo}
                                                alt={guide.fullName}
                                                className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover dark:border-gray-600"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
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
                                        <td className="border px-4 py-2">
                                            <EditGuide item={guide} />
                                        </td>
                                        <td className="border px-4 py-2">
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
                                    <div className="flex gap-5">
                                        <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Hành động:</span>
                                            <EditGuide item={guide} />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">Hành động:</span>
                                            <DeleteGuide item={guide} />
                                        </div>
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

            <GoBack />
        </div>
    );
}

export default Guide;
