import React from "react";
import Modal from "react-modal";
import FormDiscount from "./FormDiscount";

function ModalDiscount({ isOpen, closeModal, data, handleChange, handleSubmit, isLoading }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            padding: "0",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            border: "none",
            overflowY: "auto",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Tạo Mã Giảm Giá Mới"
            ariaHideApp={false}
        >
            <FormDiscount
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                isLoading={isLoading}
            />
        </Modal>
    );
}

export default ModalDiscount;
