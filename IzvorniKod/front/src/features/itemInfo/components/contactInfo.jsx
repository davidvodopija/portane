import "bootstrap/dist/css/bootstrap.css";
import "./contactInfo.css";
import mailLogo from "../../../assets/mailLogo.png";

function ContactInfo() {
	return (
		<div className="d-flex justify-content-end">
			<div className="card w-25 mx-4 my-4 contact-card">
				<div className="card-body">
					<p className="card-text">
						Artikl podijelio: <i> korisnikUser</i>
					</p>
					<h6 className="card-subtitle mb-3 text-color">
						Kontaktiraj korisnika:
					</h6>
					<div className="d-flex">
						<img src={mailLogo} className="mail-logo"></img>
						<p className="card-text mx-1">korisnik@user.com</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactInfo;
