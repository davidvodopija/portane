import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
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
import PrivateSellerRoute from "./routes/auth/privateSellerRoute";
import PublicAuthRoute from "./routes/auth/publicAuthRoute";
import OutfitGenerator from "./routes/app/outfitGenerator";
import OutfitSuggestion from "./routes/app/outfitSuggestion";
import SellerProfile from "./routes/app/sellerProfile";
import AddListing from "./routes/app/addListing";
import GalleryView from "./routes/app/galleryView";
import AddListingForm from "../features/addListingForm/components/addListingForm";
import OAuthCallback from "./routes/auth/OAuthCallback";
import Search from "./routes/app/search.jsx";

function Router() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
					<Route
						path="/oauth/google/:mode"
						element={<OAuthCallback></OAuthCallback>}
					/>
                    <Route
                        path="/search"
                        element={
                            <Search/>
                        }
                    />
                    <Route
                        path="/user-profile"
                        element={
                            <PrivateUserRoute>
                                <UserProfile/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/create-wardrobe"
                        element={
                            <PrivateUserRoute>
                                <CreateWardrobe/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/auth/:mode"
                        element={
                            <PublicAuthRoute>
                                <Auth/>
                            </PublicAuthRoute>
                        }
                    />
                    <Route
                        path="/auth"
                        element={
                            <PublicAuthRoute>
                                <Auth/>
                            </PublicAuthRoute>
                        }
                    />
                    <Route
                        path="/wardrobes/:wardrobeId/item-details/:id"
                        element={
                            <PrivateUserRoute>
                                <ItemDetails/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/itemInfo/:type/:id"
                        element={
                            <ItemDetails/>
                        }
                    />
                    <Route
                        path="/wardrobes/:wardrobeId"
                        element={
                            <PrivateUserRoute>
                                <WardrobeView/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/wardrobes/:wardrobeId/edit"
                        element={
                            <PrivateUserRoute>
                                <EditWardrobe/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/wardrobes/:wardrobeId/add-item"
                        element={
                            <PrivateUserRoute>
                                <AddItem/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/wardrobes/:wardrobeId/edit-item/:itemId"
                        element={
                            <PrivateUserRoute>
                                <AddItem/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/wardrobes/:wardrobeId/add-item"
                        element={
                            <PrivateUserRoute>
                                <AddItem/>
                            </PrivateUserRoute>
                        }
                    />
                    <Route
                        path="/seller-profile"
                        element={
                            <PrivateSellerRoute>
                                <SellerProfile/>
                            </PrivateSellerRoute>
                        }
                    />
                    <Route
                        path="/add-listing"
                        element={
                            <PrivateSellerRoute>
                                <AddListing/>
                            </PrivateSellerRoute>
                        }
                    />
                    <Route
                        path="galleries/:galleryId"
                        element={
                            <PrivateSellerRoute>
                                <GalleryView/>
                            </PrivateSellerRoute>
                        }
                    />

                    <Route
                        path="galleries/:galleryId/listing/:id"
                        element={
                            <PrivateSellerRoute>
                                <ItemDetails/>
                            </PrivateSellerRoute>
                        }
                    />

					<Route
						path="/galleries/:galleryId/edit-ad/:adId"
						element={
							<PrivateSellerRoute>
								<AddListingForm />
							</PrivateSellerRoute>
						}
					/>

					<Route
						path="/outfit-generator"
						element={
							<PrivateUserRoute>
								<OutfitGenerator />
							</PrivateUserRoute>
						}
					/>

					<Route
						path="/outfit-suggestion"
						element={
							<PrivateUserRoute>
								<OutfitSuggestion />
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
