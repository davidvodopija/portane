import "bootstrap/dist/css/bootstrap.css";
import "./searchBar.css";

function SearchBar({size = "big", text = "Pretraži"}) {
    return (
        <div className={`search-container-${size} d-flex justify-content-end`}>
            <form role="search" className="w-100 form-responsive">
                <input
                    className="form-control ps-3 pe-5"
                    type="search"
                    placeholder={text}
                    aria-label="Search"
                />
            </form>
            <div className="image-container pe-3" type="submit">
                <i className="bi bi-search "></i>
            </div>
        </div>
    );
}

export default SearchBar;
