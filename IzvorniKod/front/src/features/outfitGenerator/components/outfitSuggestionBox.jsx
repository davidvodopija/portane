import Placeholder from "../../../assets/outfit.jpg";
import Button from "../../../components/button/button";
import "./outfitSuggestionBox.css";

function OutfitSuggestionBox() {
	return (
		<div className="outfit-suggestion-box container my-5 border rounded">
			<h1 className="title-style ms-3">
				TVOJA SAVRŠENA MODNA KOMBINACIJA...
			</h1>

			<div className="outfit-components d-flex flex-wrap justify-content-center p-3">
				<div className="item d-flex gap-3">
					<img src={Placeholder} />
					<div>
						<p> MAJICA </p>
						<p> ormar1, druga šipka za odjeću</p>
					</div>
				</div>
				<div className="item d-flex gap-3">
					<img src={Placeholder} />
					<div>
						<p> HLAČE</p>
						<p> ormar5, druga šipka za odjeću</p>
					</div>
				</div>
				<div className="item d-flex gap-3">
					<img src={Placeholder} />
					<div>
						<p> TENISICE</p>
						<p> ormar1, druga šipka za odjeću</p>
					</div>
				</div>
				<div className="item d-flex gap-3">
					<img src={Placeholder} />
					<div>
						<p> JAKNA</p>
						<p> ormar1, druga šipka za odjeću</p>
					</div>
				</div>
				<div className="item d-flex gap-3">
					<img src={Placeholder} />
					<div>
						<p> MODNI DODATAK</p>
						<p> najveći ormar, ladica 5</p>
					</div>
				</div>
			</div>

			<div className="buttons-w d-flex justify-content-center ms-0 py-2">
				<Button color="grey" size="long" radius="rounded">
					PROMIJENI KRITERIJE
				</Button>
				<Button color="red" size="long" radius="rounded">
					IZGRADI PONOVNO
				</Button>
			</div>
		</div>
	);
}
export default OutfitSuggestionBox;
