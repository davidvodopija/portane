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
				console.log("OAuth Response:", response.data);
				if (response.data.result.seller) {
					fetch(response.data.result.seller.logo)
						.then((res) => res.blob())
						.then((blob) => {
							const file = new File([blob], "logo.png", { type: "image/png" });
							uploadImage(file).then((uploadedLink) => {
								response.data.result.seller.logo = uploadedLink.result.link;
								setUser(response.data.result);
								window.location.href = "/";
							});
						});
				}
				setUser(response.data.result);
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
