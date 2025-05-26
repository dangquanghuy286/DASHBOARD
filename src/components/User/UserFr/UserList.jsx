import React from "react";

import UserPr from "../../../pages/Users/UserPr";
import EntriesFilter from "../../Pagination";

function UserList({ users, currentPage, totalPages, onPageChange }) {
    return (
        <>
            <div className="mt-0 grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <UserPr
                            key={index}
                            user={user}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Không có dữ liệu</p>
                )}
            </div>
            <EntriesFilter
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </>
    );
}

export default UserList;
