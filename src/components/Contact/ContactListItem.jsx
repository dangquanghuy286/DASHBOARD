import React from "react";
import LoadingSpinner from "../LoadingSniper";
import DeleteButton from "../Button/DeleteButton";

function ContactListItem({ contact, index, toggleCheckbox, isLoading, deleteContact, isDeleting }) {
    return (
        <li
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
                        disabled={isLoading}
                    />
                    <div>
                        <h3
                            className={`text-lg font-semibold sm:text-xl ${
                                contact.checked ? "text-gray-500 line-through dark:text-gray-400" : "text-gray-800 dark:text-[#00c0d1]"
                            }`}
                        >
                            {contact.fullName}
                            {isLoading && (
                                <span className="ml-2 inline-flex items-center">
                                    <LoadingSpinner message="Đang cập nhật..." />
                                </span>
                            )}
                        </h3>
                        <div className="mt-1 text-base text-gray-500 dark:text-gray-400">
                            {contact.phoneNumber}
                            {contact.email && <span className="ml-2">| {contact.email}</span>}
                        </div>
                        <p className="mt-2 text-base text-gray-600 sm:text-lg dark:text-gray-300">{contact.content}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-base text-gray-400 dark:text-gray-500">#{index + 1}</div>
                    {contact.checked && (
                        <DeleteButton
                            onDelete={async () => {
                                await deleteContact(contact.contactId);
                                return true; // Trả về true để hiển thị thông báo thành công
                            }}
                            confirmText="Bạn có chắc muốn xóa liên hệ này không?"
                            successText="Liên hệ đã được xóa thành công!"
                            disabled={isDeleting}
                        ></DeleteButton>
                    )}
                </div>
            </div>
        </li>
    );
}

export default ContactListItem;
