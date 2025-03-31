import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaMapMarkedAlt } from "react-icons/fa";
import { getDataPayment } from "../../services/paymentSevice";

const PaymentDataCard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getDataPayment();
                setData(res || []);
            } catch (error) {
                console.error("Error fetching payment data:", error);
                setData([]);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className="card col-span-1 overflow-hidden rounded-lg bg-white shadow-md md:col-span-2 lg:col-span-3 dark:bg-gray-800">
            <div className="card-header flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <FaMapMarkedAlt size={26} />
                </div>
                <h2 className="card-title text-xl font-semibold text-gray-800 dark:text-gray-200">Dữ liệu thanh toán</h2>
            </div>
            <div className="card-body p-4">
                <h3 className="title mb-4 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">Phương thức thanh toán</h3>

                {data.length > 0 ? (
                    <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                        {/* Biểu đồ */}
                        <div className="flex w-full justify-center md:w-1/2">
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={3}
                                        dataKey="percentage"
                                        nameKey="method"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bảng dữ liệu */}
                        <div className="w-full md:w-1/2">
                            <table className="w-full border-collapse text-left text-gray-800 dark:text-gray-200">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-600">
                                        <th className="py-2 pl-2">Tên</th>
                                        <th className="py-2 text-center">Phần Trăm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            <td className="flex items-center gap-2 py-2 pl-2">
                                                <span
                                                    className="inline-block h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: item.color }}
                                                ></span>
                                                {item.method}
                                            </td>
                                            <td className="py-2 text-center">{item.percentage}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p className="py-4 text-center text-gray-500 dark:text-gray-400">Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentDataCard;
