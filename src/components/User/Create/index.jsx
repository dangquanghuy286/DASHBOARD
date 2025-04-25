/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import icons from "../../../util/icon";
import Swal from "sweetalert2";

import { createDataUser, getRoles } from "../../../services/userSevice";

import { generateToken } from "../../../helpers/generateTonken";

import UserModal from "../ModelUser";
import AddButton from "../../Button/CreateButton";
const { IoIosAdd } = icons;
function CreateUser() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getRoles();
            setDataCategory(res);
        };
        fetchAPI();
    }, []);

    const handleReload = () => setReload(!reload);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setData({});
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let updatedData = {
            ...data,
            [name]: value,
        };

        if (name === "role" && value === "Admin") {
            updatedData = {
                ...updatedData,
                userId: `admin${Date.now().toString().slice(-3)}`,
                username: data.email || "",
                password: "1234",
                token: generateToken(),
            };
        } else if (name === "role" && value !== "Admin") {
            const { userId, username, password, token, ...rest } = updatedData;
            updatedData = rest;
        }

        setData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = { ...data };

        if (data.role === "Admin") {
            finalData.userId = data.userId || `admin${Date.now().toString().slice(-3)}`;
            finalData.username = data.username || data.email;
            finalData.password = data.password || "1234";
            finalData.token = generateToken();
        }

        const result = await createDataUser(finalData);

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

    return (
        <>
            <AddButton
                onClick={openModal}
                text="Thêm người dùng"
            />

            <UserModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                dataCategory={dataCategory}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default CreateUser;
