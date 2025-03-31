import icons from "../../util/icon";
import DataChartMonth from "./dataChartsMonth";
import PaymentTours from "./paymentTour";
import TopbookedTour from "./topbookedTour";
import TotalAll from "./totalAll";
import TourStatistics from "./tourStatistics";

const { FaRocket } = icons;
function Home() {
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Trang chủ</h1>
            <TotalAll />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                <TourStatistics />
                <PaymentTours />
                <TopbookedTour />
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header flex">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <FaRocket size={26} />
                        </div>
                        <p className="card-title">Tour mới</p>
                    </div>
                </div>
                <DataChartMonth />
            </div>
        </div>
    );
}
export default Home;
