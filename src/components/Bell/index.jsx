import icons from "../../util/icon";
const { FaBell } = icons;
function Bell() {
    return (
        <button className="btn-announcement size-12 rounded-full border border-blue-600">
            <FaBell size={20} />
        </button>
    );
}
export default Bell;
