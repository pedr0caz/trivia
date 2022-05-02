import React from "react";
import Logo from "../UI/Logo";

export default function Trivia({ startTrivia }) {
	return (
		<section>
			<Logo/>
			<p className="intro_selection_subtitle">Do you know everything?</p>
			<button className="intro_selection_btn" onClick={startTrivia}>
				Play
			</button>
		</section>
	);
}
