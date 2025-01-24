import {useEffect, useState, useContext} from "react";
import "../../wardrobeView/components/wardrobeItemsList.css";
import GalleryAd from "./galleryAd";
import {useParams} from "react-router-dom";
import {getAllGalleryItems} from "../api/galleryAdsAPI";
import {galleriesContext} from "../../galleriesList/context/galleriesContext";
import {postAdvertSearch} from "../../itemSearch/api/categorySelectAPI.jsx";
import Paging from "../../../components/paging/paging.jsx";

function GalleryAdsList() {
    const [ads, setAds] = useState([]);
    const {galleryId} = useParams();
    const {getGalleries} = useContext(galleriesContext);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    let size = 12;


    useEffect(() => {
        postAdvertSearch({galleryId: galleryId}, page, size).then((data) => {
            setAds(data.result.content);
            setTotalPages(data.result.totalPages);
            setPage(data.result.pageable.pageNumber);
        }).catch((error) => console.error(error))
    }, [page]);

    const handleAdDelete = (deletedAdId) => {
        getAllGalleryItems(galleryId)
            .then((data) => setAds(data))
            .catch((error) => console.error(error));
        getGalleries();
    };

    return (
        <div className="d-flex w-100 pe-sm-0 pe-lg-5 flex-wrap justify-content-start">
            <div className="ms-4">
                <Paging totalPages={totalPages} setCurrentPage={setPage} currentPage={page}></Paging>
            </div>
            <div className="wardrobe-items-container d-flex flex-wrap mx-5 mt-3 mb-5">
                {ads.map((ad) => (
                    <GalleryAd
                        key={ad.id}
                        id={ad.id}
                        galleryId={galleryId}
                        onItemDeleted={handleAdDelete}
                    />
                ))}
            </div>
        </div>

    );
}

export default GalleryAdsList;
