import React, { useEffect, useState } from "react";
import { getDataBlog } from "../../services/blogService";

const BlogTable = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDataBlog();
            setData(response.blogs || []);
        };
        fetchApi();
    }, []);
    console.log(data);

    return (
        <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
                <table className="mb-5 w-full border text-sm text-black dark:text-white">
                    <thead className="bg-gray-100 text-left dark:bg-slate-800">
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Tiêu Đề</th>
                            <th className="border px-4 py-2">Nội Dung</th>
                            <th className="border px-4 py-2">Ngày Đăng</th>
                            <th className="border px-4 py-2">Ảnh</th>
                            <th className="border px-4 py-2">Tác Gỉa</th>
                            <th className="border px-4 py-2"></th>
                            <th className="border px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {data.map((blogs) => (
                            <tr
                                key={blogs.blogId}
                                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <td className="border px-4 py-2">{blogs.blogId}</td>
                                <td className="border px-4 py-2">{blogs.title}</td>
                                <td className="max-w-[120px] truncate border px-4 py-2 whitespace-nowrap">{blogs.content}</td>
                                <td className="border px-4 py-2">{blogs.createdAt}</td>

                                <td className="border px-4 py-2">
                                    <img
                                        src={blogs.image}
                                        alt={blogs.title}
                                        className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover dark:border-gray-600"
                                    />
                                </td>
                                <td className="border px-4 py-2">{blogs.author}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            {/* <div className="space-y-4 lg:hidden">
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
                </div> */}

            {/* Summary */}
            {/* <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Tổng số hướng dẫn viên: <span className="text-blue-600 dark:text-blue-400">{data.length}</span>
                    </p>
                </div> */}
        </>
    );
};

export default BlogTable;
