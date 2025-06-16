import { useEffect, useState } from "react";

import GoBack from "../../components/GoBack/Goback";
import LoadingSpinner from "../../components/LoadingSniper";
import { getDataGuide } from "../../services/guideService";
// import GuideHeader from "../../components/Guide/GuideFr/GuideHeader";
// import ErrorMessage from "../../components/ErrorMessage";
// import GuideSearch from "../../components/Guide/GuideFr/GuideSearch";
// import GuideList from "../../components/Guide/GuideFr/GuideList";
// import AddGuide from "../../components/Guide/AddGuide";

const BASE_URL = "http://localhost:8088";

function Guide() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchApi = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await getDataGuide();
            console.log(res);

            if (res.status === 200) {
                const guides = Array.isArray(res.data.guides) ? res.data.guides : res.data;
                const dataArray = guides.reverse().map((guide) => ({
                    ...guide,
                    photo: guide.photo || `${BASE_URL}/api/v1/guides/images/default-guide.jpg`,
                }));
                setData(dataArray);
                setOriginalData(dataArray);
            } else {
                throw new Error("Lấy dữ liệu thất bại hoặc đăng nhập lại");
            }
        } catch (error) {
            console.error("Lỗi fetchApi:", error);
            setError(error.response?.data?.message || "Không thể kết nối đến server");
            setData([]);
            setOriginalData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const removeDiacritics = (str) => {
        if (!str || typeof str !== "string") return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    const onSearch = (formData) => {
        const searchTerm = formData.name?.toLowerCase().trim() || "";
        if (searchTerm === "") {
            setData(originalData);
            setCurrentPage(0);
            return;
        }

        const searchTermNoDiacritics = removeDiacritics(searchTerm);
        const filteredData = originalData.filter((guide) => {
            const guideName = guide.fullName && typeof guide.fullName === "string" ? guide.fullName.toLowerCase() : "";
            const guideNameNoDiacritics = removeDiacritics(guideName);
            return guideName.includes(searchTerm) || guideNameNoDiacritics.includes(searchTermNoDiacritics);
        });

        setData(filteredData);
        setCurrentPage(0);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginateData = () => {
        const startIndex = currentPage * limit;
        const endIndex = startIndex + limit;
        return data.slice(startIndex, endIndex);
    };

    const handleReload = () => {
        fetchApi();
    };

    const handleAddSuccess = () => {
        setShowAddForm(false);
        handleReload();
    };

    const totalPages = Math.ceil(data.length / limit);

    if (loading) {
        return <LoadingSpinner message="Đang tải dữ liệu..." />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
                <GuideHeader />
                <ErrorMessage error={error} />
                <div className="mt-20 mb-20">
                    <GoBack />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            <GuideHeader onAddClick={() => setShowAddForm(true)} />
            <GuideSearch onSearch={onSearch} />

            {showAddForm && (
                <AddGuide
                    onClose={() => setShowAddForm(false)}
                    onSuccess={handleAddSuccess}
                />
            )}

            <GuideList
                guides={paginateData()}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onReload={handleReload}
            />
            <div className="mt-20 mb-20">
                <GoBack />
            </div>
        </div>
    );
}

export default Guide;
