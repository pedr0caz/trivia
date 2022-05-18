import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Nav() {
	const { currentUser, logout } = useAuth();

	return (
		<>
			<nav className="navbar">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							<i className="fi fi-rr-home"></i>
							<span className="link-text">Home</span>
						</Link>
					</li>

					<li className="nav-item">
						<Link to="/game" className="nav-link">
							<i className="fi fi-rr-play"></i>
							<span className="link-text">Play</span>
						</Link>
					</li>

					<li className="nav-item">
						<Link to="/ranking" className="nav-link">
							<i className="fi fi-rr-star"></i>

							<span className="link-text">Ranking</span>
						</Link>
					</li>

					{currentUser && (
						<li className="nav-item">
							<Link to="/update-profile" className="nav-link">
								<i className="fi fi-rr-user"></i>

								<span className="link-text">User</span>
							</Link>
						</li>
					)}

					<li className="nav-item">
						<Link to="/faq" className="nav-link">
							<i className="fi fi-rr-interrogation"></i>
							<span className="link-text">Info</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/contact" className="nav-link">
							<i className="fi fi-rr-at"></i>
							<span className="link-text">Contacts</span>
						</Link>
					</li>
				</ul>
			</nav>
			{currentUser && (
				<div className="topBar">
					{currentUser.displayName}
					<Link to="" onClick={() => logout()}>
						<i className="fi fi-rr-sign-out"></i>
					</Link>
				</div>
			)}
		</>
	);
}
