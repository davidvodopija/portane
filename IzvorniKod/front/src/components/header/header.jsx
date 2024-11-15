import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "../button/button";
import SearchBar from "../searchBar/searchBar";
import "./header.css";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Header() {
	const { user, isLoggedIn, registerUser, loginUser, logoutUser } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="container-fluid">
			<nav className="navbar">
				<div className="container-fluid">
					<a href="/" className="navbar-brand">
						PORTANE
						<div className="smalltext">
							- tvoj portable virtualni ormar
						</div>
					</a>

					<SearchBar size="big" />

					{isLoggedIn ? (
						<div className="authentication-container">
							<a>
								{user.firstname} {user.lastname}
							</a>
							<i
								className="bi bi-person-circle opacity-75 d-flex align-items-center"
								onClick={() => navigate("/user-profile")}
							></i>
							<i
								className="bi bi-box-arrow-right mb-2 opacity-75"
								onClick={() => logoutUser()}
							></i>
						</div>
					) : (
						<div className="authentication-container">
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
			</nav>
		</div>
	);
}

export default Header;
