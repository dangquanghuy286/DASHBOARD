// /* eslint-disable no-unused-vars */
// import { useState } from "react";
// import icons from "../../util/icon";

// const { RiLockPasswordFill } = icons;

// function InputField({ type, name, placeholder, value, onChange, error, icon, showLockIcon }) {
//     const [isFocused, setIsFocused] = useState(false);

//     return (
//         <div className="relative">
//             <input
//                 type={type}
//                 name={name}
//                 placeholder={placeholder}
//                 value={value}
//                 onChange={onChange}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 className={`h-12 w-full rounded-full border-2 ${
//                     error ? "border-red-500" : "border-[#019fb5]/50"
//                 } bg-slate-950 px-5 pr-12 text-lg text-white placeholder-[#019fb5]/70 transition-all duration-300 outline-none focus:border-[#019fb5] focus:ring-2 focus:ring-[#019fb5]/50`}
//             />
//             {icon && <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5]">{icon}</span>}
//             {name === "password" && <RiLockPasswordFill className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-[#019fb5]" />}
//             {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//         </div>
//     );
// }

// export default InputField;
