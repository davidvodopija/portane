function StepOne() {
	return (
		<>
			<div className="mb-3">
				<label htmlFor="username" className="form-label">
					Korisničko ime
				</label>
				<input
					type="text"
					className="form-control"
					name="username"
					id="username"
					placeholder="Unesite korisničko ime"
					data-step="1"
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					Email
				</label>
				<input
					type="email"
					className="form-control"
					name="email"
					id="email"
					placeholder="Unesite email"
					data-step="1"
					required
					pattern="^\S+@\S+\.\S+$"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="form-label">
					Lozinka
				</label>
				<input
					type="password"
					className="form-control"
					name="password"
					id="password"
					placeholder="Unesite lozinku"
					data-step="1"
					required
				/>
			</div>
		</>
	);
}

export default StepOne;
