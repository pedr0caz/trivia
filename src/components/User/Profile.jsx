import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../UI/Logo";

export default function Home() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useNavigate();

	const handleLogout = async () => {
		setError("");

		try {
			console.log(currentUser);
			await logout();

			history("/login");
		} catch (e) {
			setError("Failed to log out");
		}
	};
	
	return (
		<section>
			<Logo />
			<div>
				<h1>Profile</h1>
				{error && { error }}
				<strong>Email:</strong> {currentUser.email}
				<Link to="/update-profile">Update Profile</Link>
			</div>

			<button onClick={handleLogout}>Log Out</button>
		</section>
	);
}
