import "bootstrap/dist/css/bootstrap.css";
import "./wardrobePartsList.css";

function WardrobePartsList() {
	return (
		<div className="container p-3">
			<table className="table table-striped text-center align-middle">
				<thead>
					<tr>
						<th>NAZIV KOMPONENTE</th>
						<th>VRSTA KOMPONENTE</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ladica 1</td>
						<td>Ladica</td>
						<td>
							<button className="btn btn-link border-0 text-danger p-0 me-2">
								Edit
							</button>
							<button className="btn btn-link border-0 text-danger p-0 ms-2">
								Delete
							</button>
						</td>
					</tr>

					<tr>
						<td>Polica 1</td>
						<td>Polica</td>
						<td>
							<button className="btn btn-link border-0 text-danger p-0 me-2">
								Edit
							</button>

							<button className="btn btn-link border-0 text-danger p-0 ms-2">
								Delete
							</button>
						</td>
					</tr>

					<tr>
						<td>Polica 3</td>
						<td>Polica</td>
						<td>
							<button className="btn btn-link border-0 text-danger p-0 me-2">
								Edit
							</button>

							<button className="btn btn-link border-0 text-danger p-0 ms-2">
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="d-flex align-items-center justify-content-around mt-3">
				<div className="d-flex gap-3 w-75">
					<h4 className="bi bi-plus pt-1"></h4>
					<input
						type="text"
						className="form-control"
						placeholder="Naziv komponente"
					/>
					<select className="form-select text-secondary">
						<option>Odaberi vrstu komponente</option>
						<option>Polica</option>
						<option>Ladica</option>
						<option>Šipka za odjeću</option>
					</select>
				</div>
				<a href="#" className="text-danger">
					Add new
				</a>
			</div>
		</div>
	);
}

export default WardrobePartsList;
