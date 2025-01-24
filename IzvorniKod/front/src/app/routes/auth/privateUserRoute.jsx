import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../features/auth/context/authProvider";
import { useContext } from "react";

const PrivateUserRoute = ({ children }) => {
	const { user, isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return isLoggedIn && !user.seller ? children : <Navigate to="/auth" />;
};

export default PrivateUserRoute;
