import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

function UserPr(props) {
    const { user } = props;

    return (
        <>
            <div className="mt-0 flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg sm:flex-row dark:border-gray-700 dark:bg-slate-800">
                {/* Phần thông tin người dùng */}
                <div className="flex w-full flex-col pr-0 sm:w-1/2 sm:pr-4">
                    <div className="flex flex-1 flex-col">
                        <h3 className="mt-0 text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
                        <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <p>
                                <span className="font-semibold">About:</span> {user.about || "Chưa có thông tin"}
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span> {user.address || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {user.email || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Vai trò:</span> {user.role}
                            </p>
                        </div>
                    </div>
                    {/* Phần button được sửa */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                        <div className="w-fit flex-shrink-0">
                            <EditUser
                                user={user}
                                className="w-full min-w-[120px] px-4 py-2"
                            />
                        </div>
                        <div className="w-fit flex-shrink-0">
                            <DeleteUser
                                user={user}
                                className="w-full min-w-[120px] px-4 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Phần Avatar */}
                <div className="mt-4 flex w-full items-center justify-center sm:mt-0 sm:w-1/2">
                    <div className="h-52 w-52 overflow-hidden rounded-full border border-amber-300">
                        <img
                            src={user.avatar || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                            alt={user.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPr;
