import { useContext, useEffect, useState } from "react";
import Placeholder from "../../../assets/outfit.jpg";
import Button from "../../../components/button/button";
import "./outfitSuggestionBox.css";
import { useNavigate, useLocation } from "react-router-dom";
import { wardrobesContext } from "../../wardrobeList/context/wardrobesContext";
import { selectRandomSubcategories } from "../utils/categoriesUtils.jsx";
import { generateOutfit } from "../api/outfitGeneratorAPI.jsx";
import ReactWeather, { useWeatherBit } from "react-open-weather";

function OutfitSuggestionBox() {
	const navigate = useNavigate();
	const location = useLocation();
	const { wardrobes, items, weatherKey } = useContext(wardrobesContext);
	const { outfit, formData } = location.state || {};

	const { data, isLoading, errorMessage } = useWeatherBit({
		key: weatherKey,
		lat: wardrobes[0].latitude,
		lon: wardrobes[0].longitude,
		lang: "en",
		unit: "M", // values are (metric, standard, imperial)
	});

	if (!outfit) {
		return <div>No outfit data available.</div>;
	}

	const handleSubmit = async () => {
		try {
			const selectedCategoryIds = await selectRandomSubcategories(items);

			const updatedFormData = {
				...formData,
				categoryIds: selectedCategoryIds,
			};
			const response = await generateOutfit(updatedFormData);

			if (response) {
				navigate(`/outfit-suggestion`, {
					state: { outfit: response, formData: updatedFormData },
				});
			}
		} catch (error) {
			console.error("Error while submitting the form:", error);
		}
	};

	return (
		<div>
			<div className="weather">
				<ReactWeather
					isLoading={false}
					errorMessage={errorMessage}
					data={data}
					lang="en"
					locationLabel="Your location"
					unitsLabels={{ temperature: "°C", windSpeed: "Km/h" }}
					showForecast
				/>
			</div>

			<div className="outfit-suggestion-box container my-5 border rounded">
				<h1 className="title-style ms-3">
					TVOJA SAVRŠENA MODNA KOMBINACIJA...
				</h1>

				<div className="outfit-components d-flex flex-wrap justify-content-center p-3">
					{outfit.map((item, id) => (
						<div key={id} className="item d-flex gap-3">
							<img
								src={item.picture || Placeholder}
								alt={item.label}
							/>
							<div>
								<p>{item.label}</p>
								<p>
									{item.closetCustomComponent.closet.title}
									{", "}
									{item.closetCustomComponent.title}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="buttons-w d-flex justify-content-center ms-0 py-2">
					<Button
						color="grey"
						size="long"
						radius="rounded"
						onClick={() => navigate(`/outfit-generator`)}
					>
						PROMIJENI KRITERIJE
					</Button>
					<Button
						color="red"
						size="long"
						radius="rounded"
						onClick={handleSubmit}
					>
						IZGRADI PONOVNO
					</Button>
				</div>
			</div>
		</div>
	);
}

export default OutfitSuggestionBox;
