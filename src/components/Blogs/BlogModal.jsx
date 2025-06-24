import React from "react";
import Modal from "react-modal";
import BlogForm from "./BlogForm";

function BlogModal({ isOpen, closeModal, data, handleChange, handleContentChange, handleSubmit, renderPhoto, handleImageChange, file, isLoading }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "85vh",
            padding: "24px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            border: "none",
            overflowY: "auto",
            fontFamily: "'Inter', sans-serif",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Tạo Blog Mới"
        >
            <BlogForm
                data={data}
                handleChange={handleChange}
                handleContentChange={handleContentChange}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                renderPhoto={renderPhoto}
                handleImageChange={handleImageChange}
                file={file}
                isLoading={isLoading}
            />
        </Modal>
    );
}

export default BlogModal;
