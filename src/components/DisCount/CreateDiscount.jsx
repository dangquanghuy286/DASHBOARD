import React, { useState } from "react";
import Swal from "sweetalert2";
import icons from "../../util/icon";
import { createDiscount } from "../../services/discountService";

import AddButton from "../Button/CreateButton";
import ModelDiscount from "./ModelDiscount";

const { IoIosAdd } = icons;

function CreateDiscount({ onDiscountCreated }) {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        description: "",
        discount: "",
        startDate: "",
        endDate: "",
        quantity: "",
        code: "",
    });

    const openModal = () => setShowModal(true);

    const closeModal = () => {
        setShowModal(false);
        setData({
            description: "",
            discount: "",
            startDate: "",
            endDate: "",
            quantity: "",
            code: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Chuẩn bị dữ liệu gửi API
            const apiData = {
                ...data,
                discount: parseFloat(data.discount) || 0,
                quantity: parseInt(data.quantity, 10) || 0,
            };

            const result = await createDiscount(apiData);
            if (![200, 201].includes(result.status)) throw new Error(result.data?.message || "Tạo mã giảm giá thất bại");

            setShowModal(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Tạo mã giảm giá thành công!",
                showConfirmButton: false,
                timer: 3000,
            });

            if (onDiscountCreated) onDiscountCreated();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.message || "Có lỗi xảy ra",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm Mã Giảm Giá Mới"
                icon={<IoIosAdd />}
            />
            <ModelDiscount
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                handleChange={handleChange}
                handleSubmit={handleCreate}
                isLoading={isLoading}
            />
        </>
    );
}

export default CreateDiscount;
