import React from "react";

const dataRegion = [
    { displayName: "Miền Bắc", value: "NORTH" },
    { displayName: "Miền Trung", value: "CENTRAL" },
    { displayName: "Miền Nam", value: "SOUTH" },
];

function TourForm({ data, itinerary, handleChange, handleItineraryChange, handleSubmit, closeModal, renderAnh, handleImageChange, files = [] }) {
    const addItineraryDay = () => {
        handleItineraryChange(itinerary.length, "add", { day: itinerary.length + 1, title: "", content: [] });
    };

    const removeItineraryDay = (index) => {
        handleItineraryChange(index, "remove");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label className="block font-medium">Tên tour:</label>
                <input
                    type="text"
                    name="title"
                    value={data.title || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Điểm đến:</label>
                <input
                    type="text"
                    name="destination"
                    value={data.destination || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Thời gian:</label>
                <input
                    type="text"
                    name="duration"
                    value={data.duration || ""}
                    onChange={handleChange}
                    className="mt-1 w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-600 focus:ring-0"
                    placeholder="Thời gian sẽ tự động tính toán từ ngày bắt đầu và kết thúc"
                    required
                    readOnly
                />
            </div>

            <div>
                <label className="block font-medium">Khu vực:</label>
                <select
                    name="region"
                    value={data.region || ""}
                    onChange={(e) => {
                        console.log("Region selected:", e.target.value); // Debug
                        handleChange(e);
                    }}
                    className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Chọn khu vực</option>
                    {dataRegion.map((item, index) => (
                        <option
                            key={index}
                            value={item.value}
                        >
                            {item.displayName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block font-medium">Mô tả:</label>
                <textarea
                    name="description"
                    value={data.description || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Số lượng chỗ:</label>
                <input
                    type="number"
                    name="quantity"
                    value={data.quantity ?? ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Giá người lớn (VNĐ):</label>
                <input
                    type="number"
                    name="price_adult"
                    value={data.price_adult ?? ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Giá trẻ em (VNĐ):</label>
                <input
                    type="number"
                    name="price_child"
                    value={data.price_child ?? ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Trạng thái:</label>
                <select
                    name="availability"
                    value={data.availability ? "true" : "false"}
                    onChange={(e) => handleChange({ target: { name: "availability", value: e.target.value === "true" } })}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                >
                    <option value="true">Còn trống</option>
                    <option value="false">Hết chỗ</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Ngày bắt đầu:</label>
                <input
                    type="date"
                    name="startDate"
                    value={data.startDate || ""}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">Ngày kết thúc:</label>
                <input
                    type="date"
                    name="endDate"
                    value={data.endDate || ""}
                    onChange={handleChange}
                    min={data.startDate || new Date().toISOString().split("T")[0]}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-medium">
                    Ảnh: <span className="font-medium text-blue-600">{files.length > 0 ? `${files.length} ảnh đã chọn` : "Chưa chọn ảnh"}</span>
                </label>
                <div className="mt-2 flex items-center gap-4">
                    <label
                        htmlFor="file"
                        className="inline-block cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                        Chọn ảnh
                    </label>
                </div>
                <input
                    type="file"
                    id="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                />
                {renderAnh()}
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label className="block font-semibold">Lịch trình:</label>
                    <button
                        type="button"
                        onClick={addItineraryDay}
                        className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                        Thêm ngày
                    </button>
                </div>
                {itinerary.length > 0 ? (
                    itinerary.map((day, index) => (
                        <div
                            key={index}
                            className="mt-4 rounded border bg-gray-50 p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-blue-600">Ngày {day.day}</p>
                                <button
                                    type="button"
                                    onClick={() => removeItineraryDay(index)}
                                    className="text-sm text-red-500 hover:text-red-700"
                                >
                                    Xóa
                                </button>
                            </div>
                            <div className="mt-2">
                                <label className="block">Tiêu đề:</label>
                                <input
                                    type="text"
                                    value={day.title || ""}
                                    onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block">Nội dung:</label>
                                <textarea
                                    value={day.content.join("\n") || ""}
                                    onChange={(e) => handleItineraryChange(index, "content", e.target.value.split("\n").filter(Boolean))}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Mỗi dòng là một mục nội dung"
                                    required
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có lịch trình</p>
                )}
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                    Lưu
                </button>
            </div>
        </form>
    );
}

export default TourForm;
