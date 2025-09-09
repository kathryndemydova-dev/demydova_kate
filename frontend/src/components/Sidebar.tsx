import {NavLink} from "react-router-dom";

export default function Sidebar({
                                    searchTerm,
                                    setSearchTerm,
                                }: {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}) {
    return (
        <div className="sidebar-buttons">
            <NavLink to="/" className={({isActive}) => isActive ? "action-button active" : "action-button"}>
                HOME
            </NavLink>
            <NavLink to="/addclient" className={({isActive}) => isActive ? "action-button active" : "action-button"}>
                ADD NEW CLIENT
            </NavLink>
            <NavLink to="/payments" className={({isActive}) => isActive ? "action-button active" : "action-button"}>
                PAYMENT LIST
            </NavLink>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "action-button active" : "action-button"}>DASHBOARD</NavLink>

            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="SEARCH CLIENT BY NAME"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search"
                />
            </form>

            <NavLink
                to="faq"
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
            >
                FAQ
            </NavLink>
        </div>
    );
}