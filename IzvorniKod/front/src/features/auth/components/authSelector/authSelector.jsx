import React, { useState } from "react";
import SwitchLabel from "../switchLabel/switchLabel";
import LoginForm from "../loginForm/loginForm";
import useAuthNavigation from "../../hooks/useAuthNavigation";
import SellerRegisterForm from "../registerForm/sellerRegisterForm";
import UserRegisterForm from "../registerForm/userRegisterForm";

const AuthSelector = ({ mode = "login" }) => {
	const [isLogin, setIsLogin] = useState(mode === "login");
	const [isUser, setIsUser] = useState(true);

	useAuthNavigation(isLogin);

	return (
		<>
			<div className="d-flex text-center justify-content-center my-3">
				<SwitchLabel
					isActive={!isLogin}
					onClick={() => {
						setIsLogin(false);
					}}>
					REGISTRIRAJ SE
				</SwitchLabel>
				<SwitchLabel
					isActive={isLogin}
					onClick={() => {
						setIsLogin(true);
					}}>
					PRIJAVI SE
				</SwitchLabel>
			</div>
			{isLogin ? (
				<LoginForm />
			) : isUser ? (
				<UserRegisterForm isUser={isUser} setIsUser={setIsUser} />
			) : (
				<SellerRegisterForm isUser={isUser} setIsUser={setIsUser} />
			)}
		</>
	);
};

export default AuthSelector;
