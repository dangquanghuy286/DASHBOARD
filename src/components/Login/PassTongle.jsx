function PasswordToggle({ showPassword, setShowPassword }) {
    return (
        <div className="mt-2 flex items-center justify-end space-x-2">
            <label className="relative inline-flex cursor-pointer items-center">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="peer sr-only"
                />
                <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#019fb5]/50 bg-slate-950 transition-all duration-200 peer-checked:border-[#019fb5] peer-checked:bg-[#019fb5]">
                    <svg
                        className={`h-4 w-4 text-white ${showPassword ? "opacity-100" : "opacity-0"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </label>
            <label
                htmlFor="showPassword"
                className="text-sm text-white/80 transition-colors hover:text-white"
            >
                Hiển thị mật khẩu
            </label>
        </div>
    );
}

export default PasswordToggle;
