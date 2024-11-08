import Button from "../button/button";
import SearchBar from "../searchBar/searchBar";
import "./header.css";

function Header() {
	return (
		<div className="container-fluid">
			<nav className="navbar">
				<div className="container-fluid">
					<a className="navbar-brand">
						PORTANE
						<div className="smalltext">
							-tvoj portable virtualni ormar
						</div>
					</a>

					<SearchBar></SearchBar>

					<div className="authentication-container">
						<a>Registriraj se</a>
						<Button size="small" color="orange" radius="standard">
							Ulogiraj se
						</Button>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Header;
