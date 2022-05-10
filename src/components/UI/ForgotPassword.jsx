import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../UI/Logo";
export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to reset password");
		}

		setLoading(false);
	}

	return (
		<section>
		<Logo />
		<div className="box">
			<div>
				<>
					<h1>Password Reset</h1>
					{error && { error }}
					{message && { message }}
					<form onSubmit={handleSubmit}>
						<div id="email">
							<label>Email</label>
							<input type="email" ref={emailRef} required />
						</div>
						<button disabled={loading}  type="submit">
							Reset Password
						</button>
					</form>
					<div >
						<Link to="/login">Login</Link>
					</div>
				</>
			</div>
			<div >
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</div>
		</section>
	);
}
