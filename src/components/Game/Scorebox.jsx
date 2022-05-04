import React, { useState, useEffect } from "react";

export default function Scorebox(props) {
	useEffect(() => {
		let timer = 0;
		const intervalId = setInterval(() => {
			if (timer < 60) {
				props.setElapsedTime((t) => t + 1);
				timer = timer + 1;
				
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		props.setProgress((props.elapsedTime * 100) / 60);
	}, [props.elapsedTime]);

	var style = {
		width: 100 - props.progress + "%",
	};

	return (
		<div className="scorebox">
			<div className="step_progress_bar mb-3">
				<div className="progress rounded-pill">
					<span>
						<i className="fi">&nbsp;{Math.round(60 - props.elapsedTime)}</i>
					</span>
					<div className="progress-bar mx-2 rounded-pill" style={style}></div>
				</div>
			</div>
			<div className="question_number">
				Question <strong>{props.current + 1}</strong> /{" "}
				<strong>{props.questions.length}</strong>
			</div>

			<div className="score_title">Score</div>
			<span className="score">{props.score}</span>
		</div>
	);
}
