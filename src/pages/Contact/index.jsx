import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GoBack from "../../components/GoBack/Goback";
import { getContact, editContact } from "../../services/contact";

const ContactNotifications = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({}); // State để theo dõi loading cho từng contact

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getContact();
                setContacts(res.data);
            } catch (err) {
                setError("Không thể tải danh sách liên hệ.");
                console.error("Lỗi khi tải danh sách:", err);
            }
        };
        fetchApi();
    }, []);

    const toggleCheckbox = async (index) => {
        const updatedContact = { ...contacts[index], checked: !contacts[index].checked };

        // Cập nhật loading
        setLoading((prev) => ({ ...prev, [index]: true }));

        // Cập nhật cục bộ
        setContacts((prev) => prev.map((item, i) => (i === index ? updatedContact : item)));

        try {
            await editContact(updatedContact.contactId, updatedContact);
        } catch (err) {
            // Hoàn tác nếu lỗi
            setContacts((prev) => prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item)));
            setError("Không thể cập nhật trạng thái. Vui lòng thử lại.");
            console.error("Lỗi khi cập nhật checked:", err);
        } finally {
            setLoading((prev) => ({ ...prev, [index]: false }));
        }
    };

    return (
        <div className="min-h-screen w-full bg-white px-4 font-sans sm:px-6 lg:px-8 dark:bg-slate-900 dark:text-white">
            <div className="py-4">
                <div className="mb-6 flex items-center justify-center rounded-2xl bg-gray-200 p-3 shadow-md dark:bg-slate-700">
                    <h1 className="text-xl font-bold tracking-wide text-gray-800 sm:text-2xl dark:text-white">Liên hệ khách hàng</h1>
                </div>

                {error && <p className="mb-4 text-red-500">{error}</p>}

                <div className="rounded-xl bg-white shadow-lg transition-colors duration-300 dark:bg-slate-950">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {contacts.map((contact, index) => (
                            <li
                                key={contact.contactId} // Đảm bảo dùng đúng trường id
                                className={`p-4 transition-colors hover:bg-gray-50 sm:p-6 dark:hover:bg-gray-700 ${
                                    contact.checked ? "bg-green-50 opacity-70 dark:bg-gray-700" : ""
                                }`}
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:items-start sm:justify-between">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={contact.checked}
                                            onChange={() => toggleCheckbox(index)}
                                            className="mt-1 h-5 w-5 accent-green-600"
                                            disabled={loading[index]} // Vô hiệu hóa khi đang loading
                                        />
                                        <div>
                                            <Link to={`/contact/${contact.id}`}>
                                                <h3
                                                    className={`text-lg font-semibold sm:text-xl ${
                                                        contact.checked
                                                            ? "text-gray-500 line-through dark:text-gray-400"
                                                            : "text-gray-800 dark:text-[#00c0d1]"
                                                    }`}
                                                >
                                                    {contact.fullName}
                                                    {loading[index] && <span className="ml-2 text-sm text-gray-400">Đang cập nhật...</span>}
                                                </h3>
                                            </Link>
                                            <div className="mt-1 text-base text-gray-500 dark:text-gray-400">
                                                {contact.phoneNumber}
                                                {contact.email && <span className="ml-2">| {contact.email}</span>}
                                            </div>
                                            <p className="mt-2 text-base text-gray-600 sm:text-lg dark:text-gray-300">{contact.content}</p>
                                        </div>
                                    </div>
                                    <div className="text-base text-gray-400 dark:text-gray-500">#{index + 1}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <GoBack />
                </div>
            </div>
        </div>
    );
};

export default ContactNotifications;
