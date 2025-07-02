/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CreateDiscount from "./CreateDiscount";
import DeleteDiscount from "./DeleteDiscount";
// import DeleteDiscount from "./DeleteDiscount";

const DiscountForm = ({ data }) => {
    const [error, setError] = useState(null);

    return (
        <div className="min-h-screen bg-white px-4 font-sans lg:col-span-8 dark:bg-slate-900 dark:text-white">
            <div className="mb-4 flex items-center justify-center rounded-2xl bg-gray-200 p-2 shadow-md dark:bg-slate-700">
                <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Quản lý mã giảm giá</h1>
            </div>
            <div className="mb-10">
                <CreateDiscount />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-black dark:text-white">
                    <thead className="bg-gray-100 text-left dark:bg-slate-800">
                        <tr>
                            <th className="border px-4 py-2 whitespace-nowrap">Tên mã</th>
                            <th className="border px-4 py-2 whitespace-nowrap">Phần trăm giảm giá</th>
                            <th className="border px-4 py-2 whitespace-nowrap">Ngày bắt đầu</th>
                            <th className="border px-4 py-2 whitespace-nowrap">Ngày kết thúc</th>
                            <th className="border px-4 py-2 whitespace-nowrap">Số lượng</th>
                            <th className="border px-4 py-2 whitespace-nowrap">Mã</th>
                            <th className="border px-4 py-2 whitespace-nowrap">Trạng thái</th>
                            <th className="border px-4 py-2 whitespace-nowrap"></th>

                            {/* <th className="delete-column border px-4 py-2 text-center">Xóa</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {error ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-4 text-center text-red-500"
                                >
                                    {error}
                                </td>
                            </tr>
                        ) : data?.data?.length > 0 ? (
                            data.data.map((item) => (
                                <tr
                                    key={item.promotionId}
                                    className="hover:bg-gray-100 dark:hover:bg-slate-800"
                                >
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.description}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.discount}%</td>
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.startDate}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.endDate}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.code}</td>
                                    <td className="border px-4 py-2 whitespace-nowrap">{item.status === "ACTIVE" ? "Còn trống" : "Tạm ngưng"}</td>
                                    <td className="delete-column border px-4 py-2 text-center">
                                        <DeleteDiscount item={item} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-4 text-center text-gray-500"
                                >
                                    Không có mã giảm giá nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DiscountForm;
