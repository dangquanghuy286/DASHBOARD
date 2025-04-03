import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

function Report() {
    const [timeRange, setTimeRange] = useState("7_days");
    const [tour, setTour] = useState("");
    const [status, setStatus] = useState("");

    // Placeholder data for charts
    const lineChartData = [
        { date: "01/04", revenue: 5000000, bookings: 150 },
        { date: "02/04", revenue: 7000000, bookings: 200 },
        { date: "03/04", revenue: 6000000, bookings: 180 },
    ];

    const pieChartDataTourType = [
        { name: "Trong nước", value: 60, color: "#4CAF50" },
        { name: "Ngoài nước", value: 40, color: "#FF9800" },
    ];

    const pieChartDataCustomerSource = [
        { name: "Online", value: 70, color: "#2196F3" },
        { name: "Offline", value: 30, color: "#FFC107" },
    ];

    const topTours = [
        {
            name: "Tour A",
            bookings: 150,
            revenue: "300 Tr",
            rating: 4.8,
            departureDate: "12/04/2025",
        },
        {
            name: "Tour B",
            bookings: 120,
            revenue: "250 Tr",
            rating: 4.5,
            departureDate: "15/04/2025",
        },
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Filters */}
            <div className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-4 shadow-md md:grid-cols-2 lg:grid-cols-4">
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="rounded border border-gray-300 p-2"
                >
                    <option value="today">Hôm nay</option>
                    <option value="7_days">7 ngày qua</option>
                    <option value="month">Tháng này</option>
                </select>
                <select
                    value={tour}
                    onChange={(e) => setTour(e.target.value)}
                    className="rounded border border-gray-300 p-2"
                >
                    <option value="">Chọn Tour (Tùy chọn)</option>
                    <option value="tour_1">Tour 1</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded border border-gray-300 p-2"
                >
                    <option value="">Chọn Trạng thái</option>
                    <option value="confirmed">Đã xác nhận</option>
                </select>
                <div className="flex gap-2">
                    <button className="rounded bg-blue-500 px-4 py-2 text-white">Lọc/Xem báo cáo</button>
                    <button className="rounded border border-blue-500 px-4 py-2 text-blue-500">Xuất báo cáo</button>
                </div>
            </div>

            {/* Quick Overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-white p-4 shadow-md">
                    <h2 className="text-lg font-semibold">Tổng Doanh Thu</h2>
                    <p className="text-xl font-bold">5.2 tỷ</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-md">
                    <h2 className="text-lg font-semibold">Tổng Lượt Đặt</h2>
                    <p className="text-xl font-bold">3200</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-md">
                    <h2 className="text-lg font-semibold">Giá trị Đơn TB</h2>
                    <p className="text-xl font-bold">1.6 triệu</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-md">
                    <h2 className="text-lg font-semibold">Khách Hàng Mới</h2>
                    <p className="text-xl font-bold">500</p>
                </div>
            </div>

            {/* Revenue & Bookings Chart */}
            <div className="rounded-xl bg-white p-4 shadow-md">
                <h2 className="text-lg font-semibold">Doanh thu & Lượt đặt theo thời gian</h2>
                <LineChart
                    width={800}
                    height={300}
                    data={lineChartData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4CAF50"
                    />
                    <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#FF9800"
                    />
                </LineChart>
            </div>

            {/* Top Performing Tours */}
            <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-md">
                <h2 className="text-lg font-semibold">Top Tour Hoạt Động Hiệu Quả</h2>
                <table className="mt-4 w-full border-collapse border border-gray-200 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Tên Tour</th>
                            <th className="border p-2">Số Lượt Đặt</th>
                            <th className="border p-2">Doanh Thu</th>
                            <th className="border p-2">Đánh Giá TB</th>
                            <th className="border p-2">Ngày Khởi Hành</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topTours.map((tour, index) => (
                            <tr key={index}>
                                <td className="border p-2">{tour.name}</td>
                                <td className="border p-2">{tour.bookings}</td>
                                <td className="border p-2">{tour.revenue}</td>
                                <td className="border p-2">{tour.rating}</td>
                                <td className="border p-2">{tour.departureDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Revenue Distribution */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-white p-4 shadow-md">
                    <h2 className="text-lg font-semibold">Theo Loại Tour</h2>
                    <PieChart
                        width={300}
                        height={300}
                    >
                        <Pie
                            data={pieChartDataTourType}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                        >
                            {pieChartDataTourType.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-md">
                    <h2 className="text-lg font-semibold">Theo Nguồn Khách</h2>
                    <PieChart
                        width={300}
                        height={300}
                    >
                        <Pie
                            data={pieChartDataCustomerSource}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                        >
                            {pieChartDataCustomerSource.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}

export default Report;
