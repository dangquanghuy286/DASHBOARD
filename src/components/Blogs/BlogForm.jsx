import React, { useState } from "react";

function BlogForm({ data, handleChange, handleSubmit, closeModal, renderPhoto, handleImageChange, file, isLoading }) {
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!data.title || data.title.trim() === "") {
            newErrors.title = "Tiêu đề không được để trống";
        } else if (data.title.length > 255) {
            newErrors.title = "Tiêu đề không được vượt quá 255 ký tự";
        }

        if (!data.content || data.content.trim() === "") {
            newErrors.content = "Nội dung không được để trống";
        }

        if (!data.author || data.author.trim() === "") {
            newErrors.author = "Tác giả không được để trống";
        } else if (data.author.length > 100) {
            newErrors.author = "Tên tác giả không được vượt quá 100 ký tự";
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
                <label className="block font-medium">Tiêu đề:</label>
                <input
                    type="text"
                    name="title"
                    value={data.title || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div>
                <label className="block font-medium">Nội dung:</label>
                <textarea
                    name="content"
                    value={data.content || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    rows="10"
                    required
                />
                {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
            </div>

            <div>
                <label className="block font-medium">Tác giả:</label>
                <input
                    type="text"
                    name="author"
                    value={data.author || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-[#00c0d1]"
                    required
                />
                {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author}</p>}
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
                    name="image"
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

export default BlogForm;
