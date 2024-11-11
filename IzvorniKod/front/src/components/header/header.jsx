import Button from "../button/button";
import SearchBar from "../searchBar/searchBar";
import "./header.css";

function Header() {
	let isLoggedIn = true;
	let imeKorisnika = "Ime Korisnika";

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
							<a>{imeKorisnika}</a>
							<i className="bi bi-person-circle opacity-75 d-flex align-items-center"></i>
						</div>
					) : (
						<div className="authentication-container">
							<a
								href="#"
								className="btn"
								role="button"
								data-bs-toggle="button"
							>
								Registriraj se
							</a>
							<Button
								size="small"
								color="orange"
								radius="standard"
							>
								Ulogiraj se
							</Button>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Header;
