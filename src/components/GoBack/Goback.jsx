import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function GoBack() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={handleOnClick}
            className="flex w-[150px] items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md focus:ring-2 focus:ring-blue-300 focus:outline-none dark:from-blue-600 dark:to-purple-600 dark:focus:ring-purple-400"
        >
            <ArrowLeft
                size={16}
                className="stroke-2"
            />
            <span>Trở lại</span>
        </button>
    );
}

export default GoBack;
