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
        <div className=" d-flex align-items-center justify-content-between navbar">
            <a href="/" className="navbar-brand text-center">
        <span className="brand-text">
            PORTANE
        </span>
                <div className="smalltext">
                    - tvoj portable virtualni ormar
                </div>
            </a>
            <div className="flex-grow-1 mx-4">
                <SearchBar size="big"/>
            </div>
            {isLoggedIn ? (
                <div className="authentication-container d-flex align-items-center justify-content-end">
                    <a className="me-2">
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