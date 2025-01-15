import "bootstrap/dist/css/bootstrap.css";
import "./wardrobeList.css";
import WardrobeCard from "../../../features/wardrobeList/components/wardrobeCard";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth.jsx";
import { wardrobesContext } from "../context/wardrobesContext.jsx";

function WardrobeList() {
	const { wardrobes } = useContext(wardrobesContext);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (wardrobes) {
			setIsLoading(false);
		}
	}, [wardrobes]);

	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		return <div>Not logged in</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (wardrobes.length === 0) {
		return (
			<div className="container-fluid ps-4 pb-2">
				Created closets will be visible here
			</div>
		);
	}

	return (
		<div className="wardrobes-container d-flex flex-wrap mx-5">
			{wardrobes.map((wardrobe) => {
				const { title, id, componentsList } = wardrobe;
				return (
					<div key={id} className="form-group">
						<WardrobeCard
							wardrobeName={title}
							numOfShelves={componentsList[0]}
							numOfDrawers={componentsList[1]}
							numOfRods={componentsList[2]}
							wardrobeID={id}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default WardrobeList;
