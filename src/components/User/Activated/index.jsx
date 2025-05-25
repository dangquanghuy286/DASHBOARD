import { activateUserByAdmin } from "../../../services/userSevice";
import ActivateButton from "../../Button/ButtonActivated";

function ActivateUser({ user, onReload }) {
    const handleActivateUser = async () => {
        try {
            const response = await activateUserByAdmin(user.id);
            if (response.status === 200 && onReload) {
                onReload();
            }
            return response.status === 200;
        } catch (error) {
            console.error("Lỗi khi kích hoạt người dùng:", error);
            return false;
        }
    };

    return (
        <ActivateButton
            onActivate={handleActivateUser}
            confirmText="Bạn có chắc muốn kích hoạt người dùng này không?"
            successText="Người dùng đã được kích hoạt thành công!"
        >
            Kích hoạt
        </ActivateButton>
    );
}

export default ActivateUser;
