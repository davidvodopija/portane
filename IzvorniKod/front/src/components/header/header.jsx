import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "../button/button";
import SearchBar from "../searchBar/searchBar";
import "./header.css";
import {useAuth} from "../../features/auth/hooks/useAuth";
import {useNavigate} from "react-router-dom";

function Header() {
    const {user, isLoggedIn, registerUser, loginUser, logoutUser} = useAuth();
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-between p-2 m-3 navbar">
            <a href="/" className="navbar-brand pb-2 mb-1">
        <span className="brand-text ps-3">
            PORTANE
        </span>
                <div className="smalltext pb-4 pt-1 ps-3">
                    - tvoj portable virtualni ormar
                </div>
            </a>
                <SearchBar size="big"/>
            {isLoggedIn ? (
                <div className="authentication-container d-flex align-items-center justify-content-end">
                    <a className="m-0 text-black username">
                        {user.firstname} {user.lastname}
                    </a>
                    <i
                        className="bi bi-person-circle d-flex align-items-center"
                        onClick={() => navigate("/user-profile")}
                    ></i>
                    <i
                        className="bi bi-box-arrow-right d-flex align-items-center"
                        onClick={() => logoutUser()}
                    ></i>
                </div>
            ) : (
                <div className="authentication-container d-flex align-items-center justify-content-end">
                    <a href="/auth/register" className="text-dark me-2">
                        Registriraj se
                    </a>
                    <Button
                        size="small"
                        color="orange"
                        radius="standard"
                        onClick={() => navigate("/auth/login")}
                    >
                        Prijavi se
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Header;