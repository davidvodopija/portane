import "bootstrap/dist/css/bootstrap.css";
import "./searchBar.css";

function SearchBar({size = "big", text = "Pretraži"}) {
    return (
        <div className={`search-container-${size}`}>
                <input
                    className="form-control ps-3"
                    type="search"
                    placeholder={text}
                    aria-label="Search"
                    
                />
                <i className="bi bi-search image-container"></i>
        </div>
    );
}

export default SearchBar;
