import "bootstrap/dist/css/bootstrap.css";
import "./userInfo.css";
import userLogo from "../../../assets/userLogo.png";
import mailLogo from "../../../assets/mailLogo.png";
import Button from "../../../components/button/button";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { wardrobesContext } from "../../wardrobeList/context/wardrobesContext.jsx";

function UserInfo() {
	const { user, isLoggedIn } = useAuth();
	const navigate = useNavigate();
	const { wardrobes, items } = useContext(wardrobesContext);

	if (!isLoggedIn) return <>Nemate pristup!</>;

	return (
		<div className="d-flex userinfocard-container mx-3">
			<div className="profile-info-container d-flex w-100">
				<div className="pe-4">
					<div className="pic-container">
						<img
							src={userLogo}
							alt="User logo icon"
							className="big-userlogo"
						/>
					</div>
					<div className=" pt-4 text-center username-color">
						MOJ PROFIL
					</div>
				</div>

				<div className="info-size-spacing d-flex flex-column justify-content-center gap-4 pb-4">
					<div>
						{user.firstname} {user.lastname}
					</div>
					<div className="d-flex">
						<div>
							<img
								src={mailLogo}
								alt="Mail logo"
								className="mail-logo pe-3"
							/>
						</div>
						<div> {user.email} </div>
					</div>

					<div>UKUPNO ORMARA: {wardrobes ? wardrobes.length : 0}</div>
					<div> UKUPNO ARTIKALA: {items ? items.length : 0} </div>
				</div>
			</div>

			<div className="buttons-container d-grid gap-4 col-6 my-4 pe-5">
				<Button
					size="medium"
					color="orange"
					radius="mediumround"
					onClick={() => navigate("/create-wardrobe")}
				>
					DODAJ NOVI ORMAR
				</Button>
				<Button
					size="medium"
					color="orange"
					radius="mediumround"
					onClick={() => navigate("/outfit-generator")}
				>
					IZGRADI ODJEVNU KOMBINACIJU
				</Button>
			</div>
		</div>
	);
}

export default UserInfo;
