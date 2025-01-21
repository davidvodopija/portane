import "bootstrap/dist/css/bootstrap.css";
import "./userInfo.css";
import mailLogo from "../../../assets/mailLogo.png";
import Button from "../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useContext, useState } from "react";
import { galleriesContext } from "../../galleriesList/context/galleriesContext";

function SellerInfo() {
	const navigate = useNavigate();
	const { user, isLoggedIn } = useAuth();
	const { galleries, setGalleries, getNoOfAds } =
		useContext(galleriesContext);

	if (!isLoggedIn) return <>Nemate pristup!</>;

	const addNewGallery = () => {
		const newGallery = {
			name: "",
			id: -1,
			adsCount: 0,
		};
		setGalleries([...galleries, newGallery]);
	};

	return (
		<div className="d-flex userinfocard-container mx-3">
			<div className="profile-info-container d-flex w-100">
				<div className="pe-4">
					<div className="pic-container">
						<img
							src={user.seller.logo}
							alt="Profile picture logo"
							className="profile-picture"
						/>
					</div>
					<div className=" pt-4 text-center username-color">
						MOJ PROFIL
					</div>
				</div>

				<div className="info-size-spacing d-flex flex-column justify-content-center gap-4 pb-4">
					<div>{user.seller.name}</div>
					<div className="d-flex">
						<div>
							<img
								src={mailLogo}
								alt="Mail logo"
								className="mail-logo pe-3"
							/>
						</div>
						<div> {user.seller.email} </div>
					</div>

					<div>
						UKUPNO GALERIJA: {galleries ? galleries.length : 0}
					</div>
					<div> UKUPNO OGLASA: {getNoOfAds()}</div>
				</div>
			</div>

			<div className="buttons-container d-grid gap-4 col-6 my-4 pe-5">
				<Button
					size="medium"
					color="orange"
					radius="mediumround"
					onClick={() => navigate("/add-listing")}
				>
					DODAJ NOVI OGLAS
				</Button>
				<Button
					size="medium"
					color="orange"
					radius="mediumround"
					onClick={addNewGallery}
				>
					DODAJ NOVU GALERIJU
				</Button>
			</div>
		</div>
	);
}

export default SellerInfo;
