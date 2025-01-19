import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./routes/app/home";
import ItemDetails from "./routes/app/itemDetails";
import UserProfile from "./routes/app/userProfile";
import CreateWardrobe from "./routes/app/createWardrobe";
import Auth from "./routes/auth/auth";
import AppProvider from "./provider";
import WardrobeView from "./routes/app/wardrobeView";
import EditWardrobe from "./routes/app/editWardrobe";
import AddItem from "./routes/app/addItem";
import PrivateUserRoute from "./routes/auth/privateUserRoute";
import PublicAuthRoute from "./routes/auth/publicAuthRoute";

function Router() {
	return (
		<BrowserRouter>
			<AppProvider>
				<Routes>
					<Route
						path="/user-profile"
						element={
							<PrivateUserRoute>
								<UserProfile />
							</PrivateUserRoute>
						}
					/>
					<Route
						path="/create-wardrobe"
						element={
							<PrivateUserRoute>
								<CreateWardrobe />
							</PrivateUserRoute>
						}
					/>
					<Route path="/" element={<Home />} />
					<Route
						path="/auth/:mode"
						element={
							<PublicAuthRoute>
								<Auth />
							</PublicAuthRoute>
						}
					/>
					<Route
						path="/auth"
						element={
							<PublicAuthRoute>
								<Auth />
							</PublicAuthRoute>
						}
					/>
					<Route
						path="/wardrobes/:wardrobeId/item-details/:id"
						element={
							<PrivateUserRoute>
								<ItemDetails />
							</PrivateUserRoute>
						}
					/>
					<Route
						path="/wardrobes/:wardrobeId"
						element={
							<PrivateUserRoute>
								<WardrobeView />
							</PrivateUserRoute>
						}
					/>
					<Route
						path="/wardrobes/:wardrobeId/edit"
						element={
							<PrivateUserRoute>
								<EditWardrobe />
							</PrivateUserRoute>
						}
					/>
					<Route
						path="/wardrobes/:wardrobeId/add-item"
						element={
							<PrivateUserRoute>
								<AddItem />
							</PrivateUserRoute>
						}
					/>
					<Route
						path="/wardrobes/:wardrobeId/edit-item/:itemId"
						element={
							<PrivateUserRoute>
								<AddItem />
							</PrivateUserRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</AppProvider>
		</BrowserRouter>
	);
}

export default Router;
