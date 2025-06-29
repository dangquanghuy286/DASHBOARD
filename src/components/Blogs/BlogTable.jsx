import React, { useEffect, useState } from "react";
import { getDataBlog } from "../../services/blogService";
import EditBlog from "./EditBlog";
import DeleteBlog from "./DeleteBlog";

const BlogTable = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDataBlog();
            setData(response.blogs || []);
        };
        fetchApi();
    }, []);

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
                                <td className="border px-4 py-2">
                                    <EditBlog item={blogs} />
                                </td>
                                <td className="border px-4 py-2">
                                    <DeleteBlog item={blogs} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 lg:hidden">
                {data.map((blogs) => (
                    <div
                        key={blogs.blogId}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="mb-4 flex items-start space-x-4">
                            <img
                                src={blogs.image}
                                alt={blogs.title}
                                className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-gray-200 object-cover dark:border-gray-600"
                            />
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-lg font-semibold text-gray-900 dark:text-white">{blogs.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">ID: {blogs.blogId}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                            <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Tác Giả:</span>
                                <span className="ml-2 text-gray-900 dark:text-gray-100">{blogs.author}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Ngày Đăng:</span>
                                <span className="ml-2 text-gray-900 dark:text-gray-100">{blogs.createdAt}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600 dark:text-gray-400">Nội dung:</span>
                                <article className="ml-2 text-gray-900 dark:text-gray-100">{blogs.content}</article>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BlogTable;
