import "bootstrap/dist/css/bootstrap.css";
import "./searchBar.css";

function SearchBar() {
	return (
		<div className="search-container">
			<form className="d-flex" role="search">
				<input
					className="form-control me-2"
					type="search"
					placeholder="Pretraži"
					aria-label="Search"
				/>
				<button className="btn btn-outline-success" type="submit">
					Search
				</button>
			</form>
		</div>
	);
}

export default SearchBar;
