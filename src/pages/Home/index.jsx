import GoBack from "../../components/GoBack/Goback";
import DataChartMonth from "./dataChartsMonth";
import PaymentTours from "./paymentTour";
import TopbookedTour from "./topbookedTour";
import TotalAll from "./totalAll";
import TourRecent from "./tour_recent";
import TourStatistics from "./tourStatistics";

function Home() {
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Trang chủ</h1>
            <TotalAll />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-8">
                <TourStatistics />
                <PaymentTours />
                <TopbookedTour />
                <TourRecent />
                <DataChartMonth />
                <GoBack />
            </div>
        </div>
    );
}
export default Home;
