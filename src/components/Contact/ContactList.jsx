import React from "react";
import ContactListItem from "./ContactListItem";

function ContactList({ contacts, toggleCheckbox, loading, deleteContact, deleting }) {
    return (
        <div className="rounded-xl bg-white shadow-lg transition-colors duration-300 dark:bg-slate-950">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {contacts.map((contact, index) => (
                    <ContactListItem
                        key={contact.contactId}
                        contact={contact}
                        index={index}
                        toggleCheckbox={toggleCheckbox}
                        isLoading={loading[index]}
                        deleteContact={deleteContact}
                        isDeleting={deleting[contact.contactId]}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
