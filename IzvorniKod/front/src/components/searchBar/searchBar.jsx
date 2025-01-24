import "bootstrap/dist/css/bootstrap.css";
import "./searchBar.css";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {searchContext} from "../../features/itemSearch/contex/searchContex.jsx";

function SearchBar({size = "big", text = "Pretraži", searchMode = "sharedItems"}) {
    const {searchTerm, setSearchTerm, setSearchMode, entered, setEntered} = useContext(searchContext);
    const navigate = useNavigate();

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setSearchMode(searchMode);
        setEntered(-entered);
        navigate("/search");
    };

    return (
        <div className={`search-container-${size}`}>
            <input
                className="form-control ps-3"
                type="search"
                placeholder={text}
                defaultValue={

                    (searchTerm !== "" || searchTerm !== "") ? searchTerm : ""
                }
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleEnterKey}
            />
            <i className="bi bi-search image-container"></i>
        </div>
    );
}

export default SearchBar;
