import "bootstrap/dist/css/bootstrap.css";
import "./itemInfo.css";
import PlaceholderImg from "../../../assets/placeholderImg.png";

function ItemInfo() {
	return (
		<div className="d-flex item-info-container mt-5 align-items-start">
			<div className="d-flex flex-column gap-4 fs-4 mb-2">
				<div className="pt-4"> NAZIV PROIZVODA</div>
				<img
					src={PlaceholderImg}
					className="item-image"
					alt="Slika proizvoda"
				/>
			</div>
			<div className="container container-margin bg-white w-50 p-4 mt-4 rounded-3 shadow-sm">
				<div className="mb-3 fs-4 large-red-text">
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
