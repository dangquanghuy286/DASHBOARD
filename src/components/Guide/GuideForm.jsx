import React, { useState } from "react";

function GuideForm({ data, handleChange, handleSubmit, closeModal, renderPhoto, handleImageChange, file, genderOptions, isLoading }) {
    const [errors, setErrors] = useState({});

    // Validation khi submit form
    const handleFormSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!data.fullName || data.fullName.trim() === "") {
            newErrors.fullName = "Tên không được để trống";
        } else if (data.fullName.length > 50) {
            newErrors.fullName = "Tên không được vượt quá 50 ký tự";
        }

        if (!data.age || data.age < 18 || data.age > 100) {
            newErrors.age = "Tuổi phải từ 18 đến 100";
        }

        if (!data.gender) {
            newErrors.gender = "Vui lòng chọn giới tính";
        }

        if (!data.phoneNumber || data.phoneNumber.trim() === "") {
            newErrors.phoneNumber = "Số điện thoại không được để trống";
        } else if (data.phoneNumber.length > 15) {
            newErrors.phoneNumber = "Số điện thoại không được vượt quá 15 ký tự";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        handleSubmit(e);
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="space-y-6"
        >
            <div>
                <label className="block font-medium">Họ và tên:</label>
                <input
                    type="text"
                    name="fullName"
                    value={data.fullName || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div>
                <label className="block font-medium">Tuổi:</label>
                <input
                    type="number"
                    name="age"
                    value={data.age || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    min="18"
                    max="100"
                    required
                />
                {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
            </div>

            <div>
                <label className="block font-medium">Giới tính:</label>
                <select
                    name="gender"
                    value={data.gender || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                >
                    <option value="">Chọn giới tính</option>
                    {genderOptions.map((gender, index) => (
                        <option
                            key={index}
                            value={gender.value}
                        >
                            {gender.displayName}
                        </option>
                    ))}
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
            </div>

            <div>
                <label className="block font-medium">Số điện thoại:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={data.phoneNumber || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div>
                <label className="block font-medium">Link cơ sở dữ liệu:</label>
                <input
                    type="text"
                    name="databaseLink"
                    value={data.databaseLink || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                />
            </div>

            <div>
                <label className="block font-medium">Link Gmail:</label>
                <input
                    type="text"
                    name="gmailLink"
                    value={data.gmailLink || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                />
            </div>

            <div>
                <label className="block font-medium">Trạng thái:</label>
                <select
                    name="isActive"
                    value={data.isActive ? "true" : "false"}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                >
                    <option value="true">Hoạt động</option>
                    <option value="false">Không hoạt động</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">
                    Ảnh: <span className="font-medium text-[#00c0d1]">{file ? "1 ảnh đã chọn" : "Chưa chọn ảnh"}</span>
                    <span className="ml-2 text-sm text-gray-500">(Tối đa 5MB)</span>
                </label>
                <div className="mt-2 flex items-center gap-4">
                    <label
                        htmlFor="file"
                        className="inline-block cursor-pointer rounded-md bg-[#00c0d1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#009fb0]"
                    >
                        Chọn ảnh
                    </label>
                </div>
                <input
                    type="file"
                    id="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {renderPhoto()}
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                    disabled={isLoading}
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="flex items-center rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="mr-2 h-5 w-5 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Đang xử lý...
                        </>
                    ) : (
                        "Lưu"
                    )}
                </button>
            </div>
        </form>
    );
}

export default GuideForm;
