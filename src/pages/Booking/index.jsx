import GoBack from "../../components/GoBack/Goback";
import ShowBookingTour from "./ShowBooking";

function Booking() {
    return (
        <>
            <div className="flex flex-col gap-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-8">
                    <ShowBookingTour />
                </div>
                <div className="mb-4">
                    <GoBack />
                </div>
            </div>
        </>
    );
}

export default Booking;
