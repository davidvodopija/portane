import "bootstrap/dist/css/bootstrap.css";
import "./userInfo.css";
import userLogo from "../../../assets/userLogo.png";
import mailLogo from "../../../assets/mailLogo.png";
import Button from "../../../components/button/button";
import {useAuth} from "../../auth/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useWardrobes} from "../../wardrobeList/hooks/useWardrobes.jsx";

function UserInfo() {
    const {user, isLoggedIn, registerUser, loginUser, logoutUser} = useAuth();
    const navigate = useNavigate();
    const {wardrobes} = useWardrobes();

    if (!isLoggedIn) return <></>;

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
                <div>
                    {user.firstname} {user.lastname}
                </div>
                <div className="d-flex">
                    <div>
                        <img
                            src={mailLogo}
                            alt="Mail logo"
                            className="mail-logo"
                        />
                    </div>
                    <div> {user.email} </div>
                </div>

                <div> UKUPNO ORMARA: {(wardrobes) ? wardrobes.length : 0}</div>
                <div> UKUPNO ARTIKALA: 0</div>
            </div>

            <div className="d-grid gap-3 col-6 buttons-container">
                <Button
                    size="medium"
                    color="orange"
                    radius="rounded"
                    onClick={() => navigate("/create-wardrobe")}
                >
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
