import React, { useState } from "react";

function FormDiscount({ data, handleChange, handleSubmit, closeModal, isLoading }) {
    const [errors, setErrors] = useState({});

    // const parseNumber = (value) => {
    //     const cleanedValue = value.replace(/[^0-9.]/g, "");
    //     return parseFloat(cleanedValue) || "";
    // };

    // const formatNumber = (number) => {
    //     if (!number && number !== 0) return "";
    //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // };

    // const handleNumberChange = (e) => {
    //     const { name, value } = e.target;
    //     const numericValue = parseNumber(value);

    //     handleChange({
    //         target: {
    //             name,
    //             value: numericValue,
    //         },
    //     });

    //     setErrors((prev) => ({ ...prev, [name]: "" }));
    // };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        // Validate mô tả
        if (!data.description || data.description.trim().length < 4) {
            newErrors.description = "Mô tả phải có ít nhất 4 ký tự";
        }

        // Validate giá trị giảm giá
        if (!data.discount || data.discount <= 0) {
            newErrors.discount = "Giá trị giảm giá phải lớn hơn 0";
        } else if (data.discount > 100) {
            newErrors.discount = "Giá trị giảm giá không được vượt quá 100%";
        }

        // Validate số lượng
        if (!data.quantity || parseInt(data.quantity, 10) <= 0) {
            newErrors.quantity = "Số lượng phải lớn hơn 0";
        }

        // Validate ngày
        if (!data.startDate) {
            newErrors.startDate = "Vui lòng chọn ngày bắt đầu";
        }

        if (!data.endDate) {
            newErrors.endDate = "Vui lòng chọn ngày kết thúc";
        }

        if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
            newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        handleSubmit(e);
    };

    return (
        <div className="p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-800">Tạo Mã Giảm Giá Mới</h2>

            <form
                onSubmit={handleFormSubmit}
                className="space-y-6"
            >
                <div>
                    <label className="block font-medium text-gray-700">
                        Mô tả: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={data.description || ""}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-[#00c0d1] focus:ring-2 focus:ring-[#00c0d1]"
                        rows="4"
                        placeholder="Nhập mô tả mã giảm giá (ví dụ: Giảm giá mùa hè)"
                        required
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Phần trăm giảm giá (%): <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="discount"
                        value={data.discount || ""}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-[#00c0d1] focus:ring-2 focus:ring-[#00c0d1]"
                        placeholder="Nhập % giảm giá (ví dụ: 10)"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                    />
                    {errors.discount && <p className="mt-1 text-sm text-red-500">{errors.discount}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Số lượng mã: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        value={data.quantity || ""}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-[#00c0d1] focus:ring-2 focus:ring-[#00c0d1]"
                        placeholder="Nhập số lượng mã (ví dụ: 100)"
                        min="1"
                        required
                    />
                    {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Ngày bắt đầu: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={data.startDate || ""}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-[#00c0d1] focus:ring-2 focus:ring-[#00c0d1]"
                        required
                    />
                    {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">
                        Ngày kết thúc: <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={data.endDate || ""}
                        onChange={handleChange}
                        min={data.startDate || new Date().toISOString().split("T")[0]}
                        className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-[#00c0d1] focus:ring-2 focus:ring-[#00c0d1]"
                        required
                    />
                    {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-md bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="flex items-center rounded-md bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50"
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
                            "Tạo Mã Giảm Giá"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormDiscount;
