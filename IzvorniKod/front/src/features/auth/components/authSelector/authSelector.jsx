import React, { useState } from "react";
import SwitchLabel from "../switchLabel/switchLabel";
import LoginForm from "../loginForm/loginForm";
import RegisterForm from "../registerForm/registerForm";

const AuthSelector = ({ mode = "login" }) => {
	const [isLogin, setIsLogin] = useState(mode === "login");

	return (
		<>
			<div className="d-flex text-center justify-content-center my-3">
				<SwitchLabel
					isActive={!isLogin}
					onClick={() => {
						setIsLogin(!isLogin);
					}}>
					REGISTRIRAJ SE
				</SwitchLabel>
				<SwitchLabel
					isActive={isLogin}
					onClick={() => {
						setIsLogin(!isLogin);
					}}>
					PRIJAVI SE
				</SwitchLabel>
			</div>
			{isLogin ? <LoginForm /> : <RegisterForm />}
		</>
	);
};

export default AuthSelector;
