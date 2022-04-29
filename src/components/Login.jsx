import React, { useRef, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			navigate("/");
		} catch (e) {
			setError("Failed to log in");
			setLoading(false);
		} finally {
		}
	}

	return (
		<div className="box">
			<div>
				<div>
					<h2>Log In</h2>
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
						<button disabled={loading} type="submit">
							Log In
						</button>
					</form>
					<div>
						<Link to="/forgot-password">Forgot Password?</Link>
					</div>
				</div>
			</div>
			<div>
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</div>
	);
}
