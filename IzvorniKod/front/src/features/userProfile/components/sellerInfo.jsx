import "bootstrap/dist/css/bootstrap.css";
import "./userInfo.css";
import userLogo from "../../../assets/userLogo.png";
import mailLogo from "../../../assets/mailLogo.png";
import Button from "../../../components/button/button";
import { useNavigate } from "react-router-dom";

function SellerInfo() {
	const navigate = useNavigate();
	return (
		<div className="d-flex userinfocard-container mx-3">
			<div className="profile-info-container d-flex w-100">
				<div className="pe-4">
					<div className="pic-container">
						<img
							src={userLogo}
							alt="Profile picture logo"
							className="profile-picture"
						/>
					</div>
					<div className=" pt-4 text-center username-color">
						MOJ PROFIL
					</div>
				</div>

				<div className="info-size-spacing d-flex flex-column justify-content-center gap-4 pb-4">
					<div>Ime oglašivača/ime trgovine</div>
					<div className="d-flex">
						<div>
							<img
								src={mailLogo}
								alt="Mail logo"
								className="mail-logo pe-3"
							/>
						</div>
						<div> oglasivac@oglas.com </div>
					</div>

					<div>UKUPNO GALERIJA: N</div>
					<div> UKUPNO OGLASA: M</div>
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
				<Button size="medium" color="orange" radius="mediumround">
					DODAJ NOVU GALERIJU
				</Button>
			</div>
		</div>
	);
}

export default SellerInfo;
