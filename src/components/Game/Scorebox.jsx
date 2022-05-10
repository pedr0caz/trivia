import React, { useEffect } from "react";

export default function Scorebox({ settings, setSettings }) {
	useEffect(() => {
		let timer = 0;
		const intervalId = setInterval(() => {
			if (timer < 60) {
				setSettings((prevSettings) => {
					return {
						...prevSettings,
						gameTime: prevSettings.gameTime + 1,
					};
				});
				timer = timer + 1;
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		setSettings((prevSettings) => {
			return {
				...prevSettings,
				gameTimeBar: (settings.gameTime * 100) / 60,
			};
		});
	}, [settings.gameTime]);

	var style = {
		width: 100 - settings.gameTimeBar + "%",
	};

	return (
		<div className="scorebox">
			<div className="step_progress_bar mb-3">
				<div className="progress rounded-pill">
					<span>
						<i className="fi">&nbsp;{Math.round(60 - settings.gameTime)}</i>
					</span>
					<div className="progress-bar mx-2 rounded-pill" style={style}></div>
				</div>
			</div>
			<div className="question_number">
				Question <strong>{settings.gameCurrentQuestion + 1}</strong> /{" "}
				<strong>{settings.gameQuestions.length}</strong>
			</div>

			<div className="score_title">Score</div>
			<span className="score">{settings.playerScore}</span>
		</div>
	);
}
