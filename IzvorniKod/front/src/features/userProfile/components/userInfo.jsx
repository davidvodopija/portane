import "bootstrap/dist/css/bootstrap.css";
import "./userInfo.css";
import userLogo from "../../../assets/userLogo.png";
import mailLogo from "../../../assets/mailLogo.png";
import Button from "../../../components/button/button";

function UserInfo() {
	return (
		<div className="d-flex userinfocard-container">
			<div className="firstcolumn-container">
				<div className="pic-container">
					<img
						src={userLogo}
						alt="User logo icon"
						className="big-userlogo"
					/>
				</div>
				<div className="fs-4 pt-4 text-center username-color">
					MOJ PROFIL
				</div>
			</div>

			<div className="d-flex flex-column justify-content-center left-padding-secondcolumn info-size-spacing pb-5">
				<div>Ime Prezime</div>
				<div className="d-flex">
					<div>
						<img
							src={mailLogo}
							alt="Mail logo"
							className="mail-logo"
						/>
					</div>
					<div> korisnik@user.com</div>
				</div>

				<div> UKUPNO ORMARA: n</div>
				<div> UKUPNO ARTIKALA: m</div>
			</div>

			<div className="d-grid gap-3 col-6 buttons-container">
				<Button size="medium" color="orange" radius="rounded">
					DODAJ NOVI ORMAR
				</Button>
				<Button size="medium" color="orange" radius="rounded">
					IZGRADI ODJEVNU KOMBINACIJU
				</Button>
			</div>
		</div>
	);
}

export default UserInfo;
