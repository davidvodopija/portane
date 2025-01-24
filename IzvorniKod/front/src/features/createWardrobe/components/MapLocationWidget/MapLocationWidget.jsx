// LocationForm.jsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapLocationWidget.css";
import markerIconPng from "../../../../assets/userLogo.png";

const markerIcon = new L.Icon({
	iconUrl: markerIconPng,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

function LocationMarker({ setLocation }) {
	const [position, setPosition] = useState(null);

	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			setPosition([lat, lng]);
			setLocation({ latitude: lat, longitude: lng });
		},
	});

	return position === null ? null : (
		<Marker position={position} icon={markerIcon} />
	);
}

function MapLocationWidget({ location, setLocation }) {
	// Use the custom hook to get the current location

	return (
		<div className="form-wrapper">
			<div className="map map-scaling">
				<MapContainer
					center={[45.81, 15.97]}
					zoom={14}
					className="map-widget"
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<LocationMarker setLocation={setLocation} />
				</MapContainer>
			</div>
		</div>
	);
}

export default MapLocationWidget;
