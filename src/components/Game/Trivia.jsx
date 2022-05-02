import React from "react";

export default function Trivia({ startTrivia }) {
	return (
		<section>
			<center>
				<img src="/images/giant.png" alt="" height="100px" />
			</center>
			<p className="intro_selection_subtitle">Do you know everything?</p>
			<button className="intro_selection_btn" onClick={startTrivia}>
				Play
			</button>
		</section>
	);
}
