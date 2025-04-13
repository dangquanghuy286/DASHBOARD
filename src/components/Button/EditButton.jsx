import icons from "../../util/icon";
const { IoMdCreate } = icons;
function EditButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="flex h-9 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[hsla(211,96%,62%,1)] to-[hsla(295,94%,76%,1)] px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:from-[hsla(211,96%,55%,1)] hover:to-[hsla(295,94%,65%,1)] focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
            <IoMdCreate className="text-base" />
            {children && <span>{children}</span>}
        </button>
    );
}

export default EditButton;
