import "bootstrap/dist/css/bootstrap.css";
import "./contactInfo.css";
import mailLogo from "../../../assets/mailLogo.png";

function ContactInfo({username, mail}) {
    return (
        <div className="d-flex justify-content-end">
            <div className="card m-4 contact-card">
                <div className="card-body">
                    <p className="card-text text-color">
                        Artikl podijelio: <i> {username}</i>
                    </p>
                    <p> Kontakt:</p>
                    <div className="d-flex">
                        <div>
                            <img src={mailLogo} alt="Mail logo" className="mail-logo pe-3"/>
                        </div>
                        <div>{mail}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
