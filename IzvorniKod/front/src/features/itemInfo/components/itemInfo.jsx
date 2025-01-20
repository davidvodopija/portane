import "bootstrap/dist/css/bootstrap.css";
import "./itemInfo.css";
import PlaceholderImg from "../../../assets/placeholderImg.png";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { findWardrobeItem } from "../../wardrobeView/api/wardrobeItemsAPI";
import { wardrobesContext } from "../../wardrobeList/context/wardrobesContext";
import { useContext } from "react";
import { findGalleryItem } from "../../galleryView/api/galleryAdsAPI";
import { galleriesContext } from "../../galleriesList/context/galleriesContext";

function ItemInfo() {
	const { id, wardrobeId } = useParams();
	const { galleryId } = useParams();
	const { wardrobes } = useContext(wardrobesContext);
	const { galleries } = useContext(galleriesContext);
	const [item, setItem] = useState(null);
	const [ad, setAd] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (wardrobeId) {
			findWardrobeItem(id)
				.then((item) => {
					setItem(item);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("Error getting item details");
					setIsLoading(false);
				});
		} else if (galleryId) {
			findGalleryItem(id).then((ad) => {
				setAd(ad);
				setItem(ad.article);
				setIsLoading(false);
			});
		}
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!item && wardrobeId) {
		return <div> Item cannot be found</div>;
	}

	return (
		<div className="d-flex item-details-container align-items-center mt-5 m-3 ">
			<div className="image-col d-flex flex-column">
				<div className="large-black-text text-uppercase">
					{item.label}
				</div>
				<img
					src={item.picture || PlaceholderImg}
					className="item-image"
					alt="Slika proizvoda"
				/>
			</div>
			<div className="container details-container bg-white p-4 my-5 me-4 rounded-3 shadow-sm">
				<div className="mb-3 large-red-text">
					INFORMACIJE O PROIZVODU
				</div>
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
					{wardrobeId ? (
						<li>
							<strong>Lokacija:</strong>
							{item.closetCustomComponent.title}
							{", "}
							{
								galleries.find(
									(wardrobe) => wardrobe.id == wardrobeId
								).title
							}
						</li>
					) : null}
					{galleryId ? (
						<li>
							<strong>Galerija:</strong>
							<a
								className="text-decoration-underline text-secondary"
								role="button"
								onClick={() =>
									navigate(`/galleries/${galleryId}`)
								}
							>
								{
									galleries.find(
										(gallery) => gallery.id == galleryId
									).name
								}
							</a>
						</li>
					) : null}
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
							{item.footwearType?.id || "none"}
						</li>
					) : null}
					{galleryId ? (
						<li className="pb-0 mb-0">
							<strong>Cijena</strong>
							<h2>{ad.price}€</h2>
						</li>
					) : null}
				</ul>
			</div>
		</div>
	);
}
export default ItemInfo;
