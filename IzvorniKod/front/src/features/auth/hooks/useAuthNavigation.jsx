import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAuthNavigation = (isLogin) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(`/auth/${isLogin ? "login" : "register"}`, { replace: true });
	}, [isLogin, navigate]);
};

export default useAuthNavigation;
