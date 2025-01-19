import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../features/auth/context/authProvider";
import { useContext } from "react";

const PublicAuthRoute = ({ children }) => {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicAuthRoute;
