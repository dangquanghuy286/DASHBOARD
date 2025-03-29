import { useEffect } from "react";

/**
 * Hook lắng nghe sự kiện click bên ngoài một hoặc nhiều phần tử được truyền vào.
 * @param {Array} refs - Mảng các ref của phần tử cần kiểm tra.
 * @param {Function} callback - Hàm sẽ được gọi khi click ngoài.
 */
export const useClickOutside = (refs, callback) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Kiểm tra nếu tất cả ref đều không chứa event.target => click bên ngoài
            const isOutside = refs.every((ref) => ref.current && !ref.current.contains(event.target));

            if (isOutside && typeof callback === "function") {
                callback(event); // Gọi hàm callback nếu click bên ngoài
            }
        };

        // Gắn sự kiện click vào window
        window.addEventListener("mousedown", handleOutsideClick);

        // Cleanup: Gỡ sự kiện khi component unmount
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [callback, refs]);
};
