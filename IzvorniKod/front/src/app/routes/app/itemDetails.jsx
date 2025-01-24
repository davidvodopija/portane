import "bootstrap/dist/css/bootstrap.css";
import ItemInfo from "../../../features/itemInfo/components/itemInfo";
import ContactInfo from "../../../features/itemInfo/components/contactInfo";
import Header from "../../../components/header/header";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAdById} from "../../../features/galleryView/api/galleryAdsAPI.jsx";
import PlaceholderImg from "../../../assets/placeholderImg.png";
import "../../../features/itemInfo/components/itemInfo.css"
import {findWardrobeItem} from "../../../features/wardrobeView/api/wardrobeItemsAPI.jsx";

function itemDetailView() {
    const location = useLocation();
    const {id, type} = useParams();
    const fromWardrobe = location.pathname.includes("/wardrobes");
    const fromGallery = location.pathname.includes("/galleries");
    const [info, setInfo] = useState();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const getInfo = async () => {

        let a = (type === "ad") ? await getAdById(id) : await findWardrobeItem(id);
        return a;
    };


    useEffect(() => {
        const fetchData = async () => {
            if (!fromWardrobe && !fromGallery) {
                let myData = await getInfo();
                setInfo(myData);
            } else {
                setLoading(false);
            }
        };

        fetchData();
    }, [fromWardrobe, fromGallery, id]);

    useEffect(() => {
        if (info) {
            console.log(info)
            if (type === "ad") {
                setItem(info.article);
            } else {
                setItem(info)
            }
            setLoading(false)
            console.log(item);
        }
    }, [info]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header/>
            {
                (fromWardrobe || fromGallery) ? <ItemInfo/> : (
                    <div className="d-flex item-details-container align-items-center mt-5 m-3 ">
                        <div className="image-col d-flex flex-column">
                            <div className="large-black-text text-uppercase">{item.label}</div>
                            <img
                                src={item.picture || PlaceholderImg}
                                className="item-image"
                                alt="Slika proizvoda"
                            />
                        </div>
                        <div className="container details-container bg-white p-4 my-5 me-4 rounded-3 shadow-sm">
                            <div className="mb-3 large-red-text">INFORMACIJE O PROIZVODU</div>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <strong>Kategorija:</strong> {item.category.name}
                                </li>
                                <li>
                                    <strong>Godišnje doba:</strong> {item.season.name}
                                </li>
                                <li>
                                    <strong>Stanje:</strong> {item.condition.name}
                                </li>
                                <li>
                                    <strong>Stil/ležernost:</strong>
                                    {item.styles.map((style) => style.name).join(", ")}
                                </li>
                                <li>
                                    <strong>Glavna boja:</strong> {item.primaryColor.name}
                                </li>
                                <li>
                                    <strong>Sporedna boja:</strong>
                                    {item.secondaryColor.name}
                                </li>
                                {item.footwearType ? (
                                    <li>
                                        <strong>Otvorenost:</strong>
                                        {item.footwearType?.name || "none"}
                                    </li>
                                ) : null}
                                {(type === "ad") ? (
                                    <li className="pb-0 mb-0">
                                        <strong>Cijena</strong>
                                        <h2>{info.price}€</h2>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    </div>)

            }
            {fromWardrobe && <div className="my-5 pt-5"></div>}
            {!fromWardrobe && !fromGallery &&
                <ContactInfo
                    username={type === "ad" ? info.gallery.sellerDto.name : info.closetCustomComponent.closet.user.firstname + " " + info.closetCustomComponent.closet.user.lastname}
                    mail={type === "ad" ? info.gallery.sellerDto.email : info.closetCustomComponent.closet.user.email}
                />
            }
        </>
    );
}

export default itemDetailView;
