import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

function PrivateRoutes() {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default PrivateRoutes;
