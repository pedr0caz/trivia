import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className="logo">
					<Link to="/" className="nav-link">
						<span className="link-text logo-text">Trivia360</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/" className="nav-link">
						<i class="fi fi-rr-home"></i>
						<span className="link-text">Home</span>
					</Link>
				</li>

				<li className="nav-item">
					<Link to="/" className="nav-link">
						<i class="fi fi-rr-play"></i>
						<span className="link-text">Play</span>
					</Link>
				</li>

				<li className="nav-item">
					<Link to="/" className="nav-link">
						<i class="fi fi-rr-star"></i>

						<span className="link-text">Ranking</span>
					</Link>
				</li>

				<li className="nav-item">
					<Link to="/" className="nav-link">
						<i class="fi fi-rr-exclamation"></i>
						<span className="link-text">Info</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
