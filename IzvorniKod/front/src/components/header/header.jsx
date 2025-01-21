import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "../button/button";
import SearchBar from "../searchBar/searchBar";
import "./header.css";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Header() {
	const { user, isLoggedIn, logoutUser } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="navbar p-2 ps-0 m-3">
			<a href="/" className="navbar-brand pb-2 mb-1 m-0">
				<span className="brand-text ps-3">PORTANE</span>
				<div className="smalltext pb-4 pt-1 ps-3">
					- tvoj portable virtualni ormar
				</div>
			</a>
			<SearchBar size="big" />
			{isLoggedIn ? (
				<div
					className="authentication-container d-flex align-items-center justify-content-end"
					onClick={() =>
						user.seller
							? navigate("/seller-profile")
							: navigate("/user-profile")
					}
				>
					<a className="m-0 text-black username">
						{user.seller
							? user.seller.name
							: user.firstname + " " + user.lastname}
					</a>
					{user.seller ? (
						<img
							src={user.seller.logo}
							className="d-flex align-items-center user-logo"
						/>
					) : (
						<i
							className={
								"bi bi-person-circle d-flex align-items-center"
							}
						></i>
					)}
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
