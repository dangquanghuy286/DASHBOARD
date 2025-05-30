import React, { useEffect, useState } from "react";
import GoBack from "../../components/GoBack/Goback";

import ErrorMessage from "../../components/ErrorMessage";
import ContactList from "../../components/Contact/ContactList";
import ContactHeader from "../../components/Contact/ContactHeader";
import { deleteContact, editContact, getContact } from "../../services/contactService";

const ContactNotifications = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({});
    const [deleting, setDeleting] = useState({});

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
        setLoading((prev) => ({ ...prev, [index]: true }));
        setContacts((prev) => prev.map((item, i) => (i === index ? updatedContact : item)));
        try {
            await editContact(updatedContact.contactId, updatedContact);
        } catch (err) {
            setContacts((prev) => prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item)));
            setError("Không thể cập nhật trạng thái. Vui lòng thử lại.");
            console.error("Lỗi khi cập nhật checked:", err);
        } finally {
            setLoading((prev) => ({ ...prev, [index]: false }));
        }
    };

    const deleteContactHandler = async (id) => {
        setDeleting((prev) => ({ ...prev, [id]: true }));
        try {
            await deleteContact(id);
            setContacts((prev) => prev.filter((contact) => contact.contactId !== id));
        } catch (err) {
            setError("Không thể xóa liên hệ. Vui lòng thử lại.");
            console.error("Lỗi khi xóa liên hệ:", err);
        } finally {
            setDeleting((prev) => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="min-h-screen w-full bg-white px-4 font-sans sm:px-6 lg:px-8 dark:bg-slate-900 dark:text-white">
            <div className="py-4">
                <ContactHeader />
                {error && <ErrorMessage error={error} />}
                <ContactList
                    contacts={contacts}
                    toggleCheckbox={toggleCheckbox}
                    loading={loading}
                    deleteContact={deleteContactHandler}
                    deleting={deleting}
                />
                <div className="mt-6">
                    <GoBack />
                </div>
            </div>
        </div>
    );
};

export default ContactNotifications;
