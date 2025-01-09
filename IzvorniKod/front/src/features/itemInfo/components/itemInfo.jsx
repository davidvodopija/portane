import "bootstrap/dist/css/bootstrap.css";
import "./itemInfo.css";
import PlaceholderImg from "../../../assets/placeholderImg.png";

function ItemInfo() {
	return (
		<div className="d-flex item-details-container mt-5 m-3 ">
			<div className="image-col d-flex flex-column">
				<div className="large-black-text"> NAZIV PROIZVODA</div>
				<img
					src={PlaceholderImg}
					className="item-image"
					alt="Slika proizvoda"
				/>
			</div>
			<div className="container details-container bg-white p-4 my-5 me-4 rounded-3 shadow-sm">
				<div className="mb-3 large-red-text">
					INFORMACIJE O PROIZVODU
				</div>
				<ul className="list-unstyled mb-0">
					<li>
						<strong>Kategorija:</strong> obuća
					</li>
					<li>
						<strong>Godišnje doba:</strong> jesen
					</li>
					<li>
						<strong>Stanje:</strong> očuvano
					</li>
					<li>
						<strong>Lokacija:</strong> polica ormara
					</li>
					<li>
						<strong>Stil/ležernost:</strong> sportski
					</li>
					<li>
						<strong>Glavna boja:</strong> crna
					</li>
					<li>
						<strong>Sporedna boja:</strong> plava
					</li>
					<li>
						<strong>Otvorenost:</strong> zatvoreno
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ItemInfo;
