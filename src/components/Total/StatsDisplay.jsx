import Card from "../Card";
import icons from "../../util/icon";
const { MdOnlinePrediction, MdDoNotDisturbOnTotalSilence, FaUsers, GoPackage } = icons;
function StatsDisplay({ currentStats }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Active Tours */}
            <Card
                icon={
                    <MdOnlinePrediction
                        size={26}
                        className="text-green-500"
                    />
                }
                title="Tour đang hoạt động"
                value={currentStats.activeTours.toLocaleString()}
                percentage="N/A"
                className="transition-shadow hover:shadow-md"
            />

            {/* Users */}
            <Card
                icon={
                    <FaUsers
                        size={26}
                        className="text-blue-500"
                    />
                }
                title="Tổng số người đăng ký"
                value={currentStats.totalUsers.toLocaleString()}
                percentage="N/A"
                className="transition-shadow hover:shadow-md"
            />

            {/* Bookings */}
            <Card
                icon={
                    <MdDoNotDisturbOnTotalSilence
                        size={26}
                        className="text-orange-500"
                    />
                }
                title="Tổng số lượt booking"
                value={currentStats.totalBookings.toLocaleString()}
                percentage="N/A"
                className="transition-shadow hover:shadow-md"
            />

            {/* Revenue */}
            <Card
                icon={
                    <GoPackage
                        size={26}
                        className="text-red-500"
                    />
                }
                title="Tổng doanh thu"
                value={`${currentStats.totalRevenue.toLocaleString()} VNĐ`}
                percentage="N/A"
                valueClass="text-red-500 font-semibold"
                className="transition-shadow hover:shadow-md"
            />
        </div>
    );
}

export default StatsDisplay;
