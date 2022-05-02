import React, { useRef, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);

			history("/");
		} catch (e) {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<div className="box">
			<div>
				<div>
					<h2>Sign Up</h2>
					{error && { error }}
					<form onSubmit={handleSubmit}>
						<div id="email">
							<label>Email</label>
							<input type="email" ref={emailRef} required />
						</div>
						<div id="password">
							<label>Password</label>
							<input type="password" ref={passwordRef} required />
						</div>
						<div id="password-confirm">
							<label>Password Confirmation</label>
							<input type="password" ref={passwordConfirmRef} required />
						</div>
						<button disabled={loading} className="w-100" type="submit">
							Sign Up
						</button>
					</form>
				</div>
			</div>
			<div>
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</div>
	);
}
