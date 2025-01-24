import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../features/auth/context/authProvider";
import { uploadImage } from "../../../utils/imageAPI";

axios.defaults.withCredentials = true;

const OAuthCallback = () => {
	const { mode } = useParams();
	const navigate = useNavigate();
	const { setUser } = useContext(AuthContext);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		axios
			.get(
				`/api/${
					mode == "seller" ? "sellers" : mode
				}/oauth2/google?code=${code}`,
				{
					withCredentials: false,
				}
			)
			.then((response) => {
				const tmpUser = response.data.result;
				if (tmpUser.name) {
					tmpUser.seller = {
						id: tmpUser.id,
						name: tmpUser.name,
						logo: tmpUser.logo,
						email: tmpUser.email,
					};
				}

				if (tmpUser.seller) {
					fetch(tmpUser.seller.logo)
						.then((res) => res.blob())
						.then((blob) => {
							const file = new File([blob], "logo.png", { type: "image/png" });
							uploadImage(file).then((uploadedLink) => {
								tmpUser.seller.logo = uploadedLink.result.link;
								setUser(tmpUser);
								window.location.href = "/";
							});
						});
				}
				setUser(tmpUser);
				window.location.href = "/";
			})
			.catch((error) => {
				console.error("Error during OAuth callback:", error);
				navigate("/auth");
			});
	}, []);

	return <></>;
};

export default OAuthCallback;
