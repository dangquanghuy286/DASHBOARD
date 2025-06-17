import { useEffect, useState } from "react";

import GoBack from "../../components/GoBack/Goback";
import LoadingSpinner from "../../components/LoadingSniper";
import { getDataGuide } from "../../services/guideService";
import ErrorMessage from "../ErrorMessage";

function Guide() {
    const [data, setData] = useState([]);
    // const [originalData, setOriginalData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(0);
    // const [limit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getDataGuide();
            setData(res);
        };
        fetchApi();
    }, []);
    console.log(data);

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            {/* <GuideHeader onAddClick={() => setShowAddForm(true)} />
            <GuideSearch onSearch={onSearch} /> */}

            {/* {showAddForm && (
                <AddGuide
                    onClose={() => setShowAddForm(false)}
                    onSuccess={handleAddSuccess}
                />
            )} */}

            {/* <GuideList
                guides={paginateData()}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onReload={handleReload}
            /> */}
            <div className="mt-20 mb-20">
                <GoBack />
            </div>
        </div>
    );
}

export default Guide;
