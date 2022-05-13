import React, { useRef, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../UI/Logo";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, signInWithGoogle } = useAuth();
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
	};

	const handleSubmitWithGoogle = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await signInWithGoogle();
			setLoading(false);
			navigate("/");
		} catch (e) {
			setError("Failed to log in");
			setLoading(false);
		} finally {
		}
	};

	return (
		<section>
			<Logo />
			<div className="form-container box">
				<div className="inner-container">
					<h1>Log In</h1>
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
						<small>or login with:</small>
						<div className="google-btn" onClick={handleSubmitWithGoogle}>
							<div className="google-icon-wrapper">
								<img
									className="google-icon"
									src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
									alt="Google Login"
								/>
							</div>
						</div>
					</form>
					<Link to="/forgot-password">Forgot Password?</Link>
					<br />
					Need an account? <Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</section>
	);
}
