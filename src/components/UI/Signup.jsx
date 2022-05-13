import React, { useRef, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../UI/Logo";

export default function Signup() {
	const nicknameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { signup, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	if (currentUser) {
		navigate("/");
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		} else {
			setLoading(true);
			setError("");
			const check = signup(
				nicknameRef.current.value,
				emailRef.current.value,
				passwordRef.current.value
			);
			if (check) {
				navigate("/");
			} else {
				setError("Account already exists");
				const timer = setTimeout(() => {
					setError("");
				}, 1500);
				return () => clearTimeout(timer);
			}
		}
		setLoading(false);
	};

	return (
		<section>
			<Logo />
			<div className="form-container box">
				<div className="inner-container">
					<h1>Sign Up</h1>
					{error && <div>{error}</div>}
					<form onSubmit={handleSubmit}>
						<div id="email">
							<label>Nickname</label>
							<input type="text" ref={nicknameRef} required minLength={4} />
						</div>
						<div id="email">
							<label>Email</label>
							<input type="email" ref={emailRef} required />
						</div>
						<div id="password">
							<label>Password</label>
							<input type="password" ref={passwordRef} required minLength={8} />
						</div>
						<div id="password-confirm">
							<label>Password Confirmation</label>
							<input
								type="password"
								ref={passwordConfirmRef}
								required
								minLength={8}
							/>
						</div>
						<button disabled={loading} type="submit">
							Sign Up
						</button>
					</form>
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</div>
		</section>
	);
}
