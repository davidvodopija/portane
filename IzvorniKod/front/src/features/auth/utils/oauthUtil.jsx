export const redirectToGoogleOAuth = (isUser) => {
	const googleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";
	const params = new URLSearchParams({
		redirect_uri:
			window.location.origin + "/oauth/google/" + (isUser ? "users" : "seller"),
		response_type: "code",
		client_id:
			"141607371784-mlgite3t0ihgop2358fq132tbpp8n6jf.apps.googleusercontent.com",
		scope:
			"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
		access_type: "offline",
	});

	window.location.href = `${googleAuthURL}?${params.toString()}`;
};
