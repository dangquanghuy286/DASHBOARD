/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { editUser, getRoles } from "../../../services/userSevice";
import { generateToken } from "../../../helpers/generateTonken";
import UserModal from "../ModelUser";
import EditButton from "../../Button/EditButton";

function EditUser({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(user);
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getRoles();
            setDataCategory(res);
        };
        fetchAPI();
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

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
                username: data.username || data.email,
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
        const confirmResult = await Swal.fire({
            title: "BẠN CÓ MUỐN CẬP NHẬT THÔNG TIN?",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "LƯU",
            denyButtonText: "KHÔNG LƯU",
        });
        if (confirmResult.isConfirmed) {
            const result = await editUser(user.id, data);
            if (result) {
                setShowModal(false);
                Swal.fire({
                    title: "CẬP NHẬT THÀNH CÔNG",
                    icon: "success",
                    timer: 5000,
                });
            } else {
                Swal.fire({
                    title: "CẬP NHẬT THẤT BẠI",
                    icon: "error",
                    timer: 5000,
                });
            }
        } else if (confirmResult.isDenied) {
            Swal.fire("KHÔNG LƯU THAY ĐỔI", "", "info");
        }
    };

    return (
        <>
            <EditButton onClick={openModal}>Sửa</EditButton>

            <UserModal
                isOpen={showModal}
                closeModal={closeModal}
                data={data}
                dataCategory={dataCategory}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                mode="edit"
            />
        </>
    );
}

export default EditUser;
