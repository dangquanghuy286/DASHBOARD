import React from "react";
import { useForm } from "react-hook-form";
import icons from "../../../util/icon";
const { FaSearch } = icons;
function UserSearch({ onSearch }) {
    const { register, handleSubmit } = useForm();

    return (
        <div className="my-6 flex flex-col items-center gap-2 md:flex-row">
            <div className="mb-4 flex w-full items-center space-x-2 sm:mb-0 sm:w-auto">
                <form
                    className="inline w-full sm:w-auto"
                    onSubmit={handleSubmit(onSearch)}
                >
                    <div className="input flex w-full items-center sm:w-auto">
                        <button
                            type="submit"
                            className="cursor-pointer"
                        >
                            <FaSearch
                                size={20}
                                className="text-slate-300"
                            />
                        </button>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Tìm kiếm"
                            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 sm:w-64 dark:text-slate-50"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserSearch;
