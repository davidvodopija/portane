function StepOne({ handleChange }) {
	return (
		<>
			<div className="mb-3">
				<label htmlFor="name" className="form-label">
					Korisničko ime
				</label>
				<input
					type="text"
					className="form-control"
					name="name"
					id="name"
					placeholder="Unesite korisničko ime"
					data-step="1"
					required
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
					minLength={6}
					pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$"
					title="Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
				/>
			</div>
		</>
	);
}

export default StepOne;
