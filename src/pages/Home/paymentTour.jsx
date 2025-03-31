import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import icons from "../../util/icon";
import { getDataPayment } from "../../services/paymentSevice";

const { FaMapMarkedAlt } = icons;

function PaymentTours() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDataPayment();
            setData(res);
        };
        fetchApi();
    }, []);

    return (
        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
            <div className="card-header flex">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                    <FaMapMarkedAlt size={26} />
                </div>
                <p className="card-title">Dữ liệu thanh toán</p>
            </div>
            <div className="card-body">
                <p className="title mb-4 text-center text-lg font-semibold">Phương thức thanh toán</p>

                {/* Kiểm tra dữ liệu trước khi render */}
                {data.length > 0 ? (
                    <div className="flex flex-row items-center gap-6">
                        {/* Biểu đồ */}
                        <div className="flex w-1/2 flex-col items-center">
                            <ResponsiveContainer
                                width={300}
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
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Bảng dữ liệu */}
                        <div className="w-1/2">
                            <table className="w-full border-collapse text-left dark:text-amber-50">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Tên</th>
                                        <th className="py-2 text-center">Phần Trăm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b"
                                        >
                                            <td className="flex items-center gap-2 py-2">
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
                    <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
                )}
            </div>
        </div>
    );
}

export default PaymentTours;
