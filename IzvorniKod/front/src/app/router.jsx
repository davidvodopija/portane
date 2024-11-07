import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/app/home";
import UserProfile from "./routes/app/userProfile";
import CreateWardrobe from "./routes/app/createWardrobe";
import Auth from "./routes/auth/auth";

function Router() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/user-profile" element={<UserProfile />} />
					{/*path should maybe later be change to actual username*/}
					<Route path="/create-wardrobe" element={<CreateWardrobe />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default Router;
