import React, { useRef, useState } from "react";
import Logo from "./Logo";

export default function Contact() {
	const userName = useRef();
	const email = useRef();
	const message = useRef();
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userName.current.value && !email.current.value) {
			setError("Fill the form");
		} else {
			setError("Sent successfully");
		}
		const timer = setTimeout(() => {
			setError("");
		}, 1500);
		return () => clearTimeout(timer);
	};

	return (
		<section>
			<Logo />

			<div className="form-container">
				<div className="box inner-container">
					<h1>Contact</h1>
					<p>{error}</p>
					<form onSubmit={handleSubmit}>
						<input type="text" placeholder="Name *" required ref={userName} />
						<input type="email" placeholder="Email *" required ref={email} />

						<textarea rows={4} placeholder="Message" required ref={message} />
						<button>Submit</button>
					</form>
					<div className="social-container">
						<i className="fi fi-brands-google">
							<span>Google</span>
						</i>
						<i className="fi fi-brands-linkedin">
							<span>LinkedIn</span>
						</i>
						<i className="fi fi-brands-facebook">
							<span>Facebook</span>
						</i>
					</div>
				</div>
			</div>
		</section>
	);
}
