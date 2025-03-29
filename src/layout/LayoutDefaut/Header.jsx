import PropTypes from "prop-types";
function Header(prop) {
    const { collapsed, setCollapsed } = prop;
    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            Header
        </header>
    );
}
Header.prototype = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
export default Header;
