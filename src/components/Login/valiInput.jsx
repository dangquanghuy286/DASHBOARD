export const validateInputs = (user_name, password) => {
    const errors = {};
    if (!user_name) {
        errors.user_name = "Vui lòng nhập tên đăng nhập.";
    } else if (user_name.length < 3) {
        errors.user_name = "Tên đăng nhập phải dài ít nhất 3 ký tự.";
    }

    if (!password) {
        errors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
        errors.password = "Mật khẩu phải dài ít nhất 6 ký tự.";
    }

    return errors;
};
