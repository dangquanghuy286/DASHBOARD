import { useEffect, useState } from "react";
import { getDataUser } from "../../services/userSevice";

import GoBack from "../../components/GoBack/Goback";
import LoadingSpinner from "../../components/LoadingSniper";
import UserHeader from "../../components/User/UserFr/UserHeader";
import ErrorMessage from "../../components/ErrorMessage";
import UserSearch from "../../components/User/UserFr/UserSearch";
import UserList from "../../components/User/UserFr/UserList";

const BASE_URL = "http://localhost:8088";

function User() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await getDataUser();
                console.log(res);

                if (res.status === 200) {
                    const users = Array.isArray(res.data.users) ? res.data.users : res.data;
                    const dataArray = users.reverse().map((user) => ({
                        ...user,
                        avatar: user.avatar || `${BASE_URL}/api/v1/users/avatars/default-avatar.jpg`,
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
        const filteredData = originalData.filter((user) => {
            const userName = user.full_name && typeof user.full_name === "string" ? user.full_name.toLowerCase() : "";
            const userNameNoDiacritics = removeDiacritics(userName);
            return userName.includes(searchTerm) || userNameNoDiacritics.includes(searchTermNoDiacritics);
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

    const totalPages = Math.ceil(data.length / limit);

    if (loading) {
        return <LoadingSpinner message="Đang tải dữ liệu..." />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
                <UserHeader />
                <ErrorMessage error={error} />
                <div className="mt-20 mb-20">
                    <GoBack />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 font-sans dark:bg-slate-900 dark:text-white">
            <UserHeader />
            <UserSearch onSearch={onSearch} />
            <UserList
                users={paginateData()}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <div className="mt-20 mb-20">
                <GoBack />
            </div>
        </div>
    );
}

export default User;
