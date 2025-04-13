import { useState } from "react";
import icons from "../../util/icon";
import ShowNotifications from "./ShowNotifications";
const { FaBell } = icons;

function Bell() {
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={toggleNotifications}
                className="btn-announcement flex size-12 items-center justify-center rounded-full border border-blue-600"
            >
                <FaBell size={20} />
            </button>
            <ShowNotifications showNotifications={showNotifications} />
        </div>
    );
}

export default Bell;
