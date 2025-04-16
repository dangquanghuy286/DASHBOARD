// import { useState } from "react";

// import icons from "../../util/icon";
// import InputField from "./Input";
// import PasswordToggle from "./PassTongle";

// const { FaUserAlt } = icons;

// function LoginForm({ onSubmit, errors, loading }) {
//     const [user_name, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(user_name, password);
//     };

//     return (
//         <form
//             className="space-y-6"
//             onSubmit={handleFormSubmit}
//         >
//             <h1 className="text-center text-3xl font-bold tracking-wide text-[#019fb5]">ĐĂNG NHẬP</h1>

//             {/* Username */}
//             <InputField
//                 type="text"
//                 name="username"
//                 placeholder="Tên đăng nhập"
//                 value={user_name}
//                 onChange={(e) => setUsername(e.target.value)}
//                 error={errors.user_name}
//                 icon={<FaUserAlt />}
//             />

//             {/* Password */}
//             <div>
//                 <InputField
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Mật khẩu"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     error={errors.password}
//                     showLockIcon={!showPassword}
//                 />
//                 <PasswordToggle
//                     showPassword={showPassword}
//                     setShowPassword={setShowPassword}
//                 />
//             </div>

//             {/* Submit button */}
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className={
//                     "h-12 w-full cursor-pointer rounded-full bg-[#019fb5] font-semibold text-white transition-all duration-300 hover:bg-[#33b8c3]"
//                 }
//             >
//                 {loading ? "Đang xử lý..." : "Đăng nhập"}
//             </button>
//         </form>
//     );
// }

// export default LoginForm;
