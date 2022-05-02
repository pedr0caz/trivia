import React, { useRef, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updatePassword } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		setLoading(true);
		setError("");

		try {
			if (
				passwordRef.current.value.length > 5 &&
				passwordRef.current.value.length ===
					passwordConfirmRef.current.value.length
			) {
				updatePassword(passwordRef.current.value);
				history("/");
			}
		} catch (e) {
			console.log(e);
			setError("Failed to update account");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="box">
			<h2>Update Profile</h2>
			{error && { error }}
			<form onSubmit={handleSubmit}>
				<div id="email">
					<label>Email</label>
					<input
						type="email"
						ref={emailRef}
						required
						defaultValue={currentUser.email}
					/>
				</div>
				<div id="password">
					<label>Password</label>
					<input
						type="password"
						ref={passwordRef}
						placeholder="Leave blank to keep the same"
					/>
				</div>
				<div id="password-confirm">
					<label>Password Confirmation</label>
					<input
						type="password"
						ref={passwordConfirmRef}
						placeholder="Leave blank to keep the same"
					/>
				</div>
				<button disabled={loading} className="w-100" type="submit">
					Update
				</button>
			</form>

			<div>
				<Link to="/">Cancel</Link>
			</div>
		</div>
	);
}
