import { getDataMonths } from "../../services/chartMonthSevice";
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import icons from "../../util/icon";
const { FaChartBar } = icons;
function DataChartMonth() {
    const [dataChart, setDatachart] = useState([]);
    useEffect(() => {
        const FetchApi = async () => {
            const res = await getDataMonths();
            setDatachart(res);
        };
        FetchApi();
    }, []);
    return (
        <>
            <div className="card col-span-1 md:col-span-2 lg:col-span-8">
                <div className="card-header flex">
                    <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                        <FaChartBar size={26} />
                    </div>
                    <p className="card-title">Doanh thu theo tháng</p>
                </div>
                <div className="card-body flex gap-4 p-4">
                    <div className="card-domestic rounded-lg p-4">
                        <div className="title">Trong nước</div>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart data={dataChart.domestic}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#4CAF50"
                                    fill="#A5D6A7"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="card-word rounded-lg shadow-md">
                        <div className="title">Ngoài nước</div>
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart data={dataChart.international}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#FF9800"
                                    fill="#FFCC80"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DataChartMonth;
