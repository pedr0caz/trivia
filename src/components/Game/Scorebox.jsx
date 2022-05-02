import React, { useState, useEffect } from "react";

export default function Scorebox() {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let timer = 0;
		const intervalId = setInterval(() => {
			
			if (timer < 60) {
				setElapsedTime((t) => t + 1);
				timer = timer + 1
				console.log(timer);
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		setProgress(  elapsedTime *100 / 60 );
	}, [elapsedTime]);

	var style = {
		width:  100 - progress+"%",
	}

	return (
		<div className="scorebox">
			<div className="step_progress_bar mb-3">
				<div className="progress rounded-pill">
					<span>
						<i className="fi">&nbsp;{Math.round(60 - elapsedTime)}</i>
						
					</span>
					<div className="progress-bar mx-2 rounded-pill" style={style}></div>
				</div>
			</div>
			<div className="question_number">Question 1 / 4</div>

			<div className="score_title">Score 0</div>
			<span className="score"></span>
		</div>
	);
}
