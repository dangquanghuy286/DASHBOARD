import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

function UserPr(props) {
    const { user } = props;

    return (
        <>
            <div className="mt-0 flex rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-slate-800">
                <div className="flex w-full flex-col pr-4 sm:w-1/2 sm:items-start">
                    {/* Nội dung người dùng */}
                    <div className="flex flex-1 flex-col">
                        <div>
                            <h3 className="mt-0 text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">About:</span> {user.about || "Chưa có thông tin"}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Address:</span> {user.address || "N/A"}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Email:</span> {user.email || "N/A"}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Vai trò:</span> {user.role}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-4">
                        {/* Wrap buttons in a flex container */}
                        <div className="flex items-center space-x-4">
                            <EditUser user={user} />
                            <DeleteUser user={user} />
                        </div>
                    </div>
                </div>

                {/* Avatar */}
                <div className="flex w-full items-start justify-center sm:w-1/2">
                    {/* Đã thay items-center thành items-start */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="h-50 w-50 overflow-hidden rounded-full border border-amber-300">
                            <img
                                src={user.avatar || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserPr;
