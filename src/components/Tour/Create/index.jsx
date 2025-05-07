/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import icons from "../../../util/icon";
import { createDataTour, uploadImageTour, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;

const dataRegion = [
    { displayName: "Miền Bắc", value: "NORTH" },
    { displayName: "Miền Trung", value: "CENTRAL" },
    { displayName: "Miền Nam", value: "SOUTH" },
];

function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        destination: "",
        duration: "",
        quantity: 0,
        price_adult: 0,
        price_child: 0,
        availability: true,
        region: "",
        startDate: "",
        endDate: "",
    });
    const [files, setFiles] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [existingTours, setExistingTours] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDataTour();
                const tours = response?.data?.tours || [];
                if (!Array.isArray(tours)) {
                    throw new Error("Dữ liệu tour không hợp lệ");
                }
                setExistingTours(tours);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu tour:", error);
                setExistingTours([]);
            }
        };
        fetchData();
    }, [reload]);

    const handleReload = () => setReload(!reload);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setData({
            title: "",
            description: "",
            destination: "",
            duration: "",
            quantity: 0,
            price_adult: 0,
            price_child: 0,
            availability: true,
            region: "",
            startDate: "",
            endDate: "",
        });
        setFiles([]);
        setItinerary([]);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!Array.isArray(existingTours)) {
            Swal.fire({
                icon: "error",
                title: "Lỗi dữ liệu",
                text: "Dữ liệu tour không hợp lệ. Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const isDuplicate = existingTours.some((tour) => tour.title?.toLowerCase().trim() === data.title?.toLowerCase().trim());

        if (isDuplicate) {
            Swal.fire({
                icon: "error",
                title: "Tour đã tồn tại",
                text: "Vui lòng chọn tên tour khác.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const apiData = {
            ...data,
            itinerary: itinerary.map((item, index) => ({
                day: index + 1,
                title: item.title,
                content: Array.isArray(item.content) ? item.content : item.content.split("\n").filter(Boolean),
            })),
        };

        try {
            const result = await createDataTour(apiData);
            if (result.status === 201 || result.status === 200) {
                if (files.length > 0) {
                    const formData = new FormData();
                    files.forEach((file) => formData.append("images", file));
                    const uploadResult = await uploadImageTour(result.data.id, formData);
                    if (uploadResult.status !== 200) {
                        console.warn("Upload ảnh thất bại:", uploadResult.data);
                    }
                }

                setShowModal(false);
                handleReload();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tạo tour thành công!",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                throw new Error("Tạo tour thất bại");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể tạo tour. Vui lòng thử lại.",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data };

        if (name === "availability") {
            updatedData[name] = value === "true";
        } else {
            updatedData[name] = value;
        }

        if (name === "startDate" || name === "endDate") {
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);
            if (!isNaN(start) && !isNaN(end) && end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                updatedData.duration = `${diffDays} ngày ${diffDays - 1} đêm`;
                setItinerary(
                    Array.from({ length: diffDays }, (_, index) => ({
                        day: index + 1,
                        title: itinerary[index]?.title || "",
                        content: itinerary[index]?.content || [],
                    })),
                );
            } else {
                updatedData.duration = "";
                setItinerary([]);
            }
        }

        setData(updatedData);
        console.log("Updated data.region:", updatedData.region); // Debug
    };

    const handleImageChange = (e) => {
        const uploadedFiles = e.target.files;
        if (uploadedFiles.length > 0) {
            setFiles(Array.from(uploadedFiles));
        }
    };

    const renderAnh = () => (
        <div className="mt-2 flex flex-wrap gap-4">
            {files.map((file, index) => (
                <div
                    key={index}
                    className="h-24 w-24 overflow-hidden rounded shadow"
                >
                    <img
                        src={URL.createObjectURL(file)}
                        alt={`Ảnh ${index + 1}`}
                        className="h-full w-full object-cover"
                    />
                </div>
            ))}
        </div>
    );

    const handleItineraryChange = (index, field, value) => {
        const newItinerary = [...itinerary];
        if (field === "add") {
            newItinerary.push({ day: newItinerary.length + 1, title: "", content: [] });
        } else if (field === "remove") {
            newItinerary.splice(index, 1);
            newItinerary.forEach((item, i) => (item.day = i + 1));
        } else {
            newItinerary[index] = { ...newItinerary[index], [field]: value };
        }
        setItinerary(newItinerary);
    };

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm Tour Mới"
                icon={<IoIosAdd />}
            />
            <TourModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                itinerary={itinerary}
                handleChange={handleChange}
                handleItineraryChange={handleItineraryChange}
                handleSubmit={handleCreate}
                renderAnh={renderAnh}
                handleImageChange={handleImageChange}
                files={files}
                dataRegion={dataRegion}
            />
        </>
    );
}

export default CreateTour;
