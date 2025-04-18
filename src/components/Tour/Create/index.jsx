import React, { useEffect, useState } from "react";
import icons from "../../../util/icon";
import Swal from "sweetalert2";

import { createDataTour, getDataRegion, getDataTour } from "../../../services/tourService";
import TourModal from "../ModelTour";
import AddButton from "../../Button/CreateButton";

const { IoIosAdd } = icons;
function CreateTour() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [reload, setReload] = useState(false);
    const [dataRegion, setDataRegion] = useState([]);
    const [files, setFiles] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [existingTours, setExistingTours] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const regions = await getDataRegion();
            setDataRegion(regions);
            const tours = await getDataTour();
            setExistingTours(tours);
        };
        fetchData();
    }, []);

    const handleReload = () => setReload(!reload);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        const isDuplicate = existingTours.some((tour) => tour.tourName.toLowerCase().trim() === data.tourName?.toLowerCase().trim());

        if (isDuplicate) {
            Swal.fire({
                icon: "error",
                title: "Tour đã tồn tại",
                text: "Vui lòng chọn tên tour khác.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const result = await createDataTour({ ...data, timeline });

        if (result) {
            setShowModal(false);
            handleReload();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tạo mới thành công!",
                showConfirmButton: false,
                timer: 5000,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === "startDate" || name === "endDate") {
            const start = new Date(updatedData.startDate);
            const end = new Date(updatedData.endDate);
            if (!isNaN(start) && !isNaN(end) && end >= start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                updatedData.duration = `${diffDays} ngày`;
                setTimeline(Array.from({ length: diffDays }, () => ({ title: "", content: "" })));
            } else {
                updatedData.duration = "";
                setTimeline([]);
            }
        }

        setData(updatedData);
    };

    const handleImageChange = (e) => {
        const uploadfile = e.target.files;
        if (!uploadfile) return;

        setFiles(uploadfile);
    };

    const renderAnh = () =>
        [...files].map((anh, index) => (
            <div
                key={index}
                className="m-2"
            >
                <img
                    src={URL.createObjectURL(anh)}
                    alt={`Ảnh ${index + 1}`}
                    width="100"
                    className="rounded shadow"
                />
            </div>
        ));

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...timeline];
        newTimeline[index][field] = value;
        setTimeline(newTimeline);
    };

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm Tour mới"
            />

            <TourModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                dataRegion={dataRegion}
                timeline={timeline}
                handleChange={handleChange}
                handleTimelineChange={handleTimelineChange}
                handleSubmit={handleCreate}
                renderAnh={renderAnh}
                handleImageChange={handleImageChange}
                files={files}
            />
        </>
    );
}

export default CreateTour;
