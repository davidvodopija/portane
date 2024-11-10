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
				<div className="image-container" type="submit">
					<i class="bi bi-search"></i>
				</div>
			</form>
		</div>
	);
}

export default SearchBar;
