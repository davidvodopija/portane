import WardrobeItem from "./wardrobeItem";
import "./wardrobeItemsList.css";
import {useState, useEffect, useContext} from "react";
import {getAllWardrobeItems} from "../api/wardrobeItemsAPI";
import {useParams} from "react-router-dom";
import {wardrobesContext} from "../../wardrobeList/context/wardrobesContext";
import {postSearch} from "../../itemSearch/api/categorySelectAPI.jsx";
import Paging from "../../../components/paging/paging.jsx";

function WardrobeItemsList() {
    const [items, setItems] = useState([]);
    const {wardrobeId} = useParams();
    const {getWardrobes} = useContext(wardrobesContext);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    let size = 8;

    useEffect(() => {
        postSearch({
            closetId: wardrobeId,
        }, page, size).then((data) => {
            console.log(data);
            setItems(data.result.content);
            setPage(data.result.pageable.pageNumber);
            setTotalPages(data.result.totalPages);
        }).catch((error) => console.error(error));
    }, [page]);

    const handleItemDeleted = (deletedItemId) => {
        getAllWardrobeItems(wardrobeId)
            .then((data) => setItems(data))
            .catch((error) => console.error(error));
        getWardrobes();
    };

    return (
        <div className="d-flex flex-wrap justify-content-start">
            <Paging currentPage={page} totalPages={totalPages} setCurrentPage={setPage}></Paging>

            <div className="wardrobe-items-container d-flex flex-wrap mx-5 mt-3 mb-5">
                {items.map((item) => (
                    <WardrobeItem
                        key={item.id}
                        id={item.id}
                        onItemDeleted={handleItemDeleted}
                        wardrobeId={wardrobeId}
                    />
                ))}
            </div>

        </div>

    );
}

export default WardrobeItemsList;
