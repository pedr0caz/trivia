import React, { useState, useRef } from "react";

export default function Question({ question, setSettings }) {
	const correctRef = useRef();

	const [loading, setLoading] = useState(false);

	const onChange = (event, choice) => {
		event.preventDefault();
		setLoading(true);

		if (choice === question.correct) {
			event.target.style.backgroundColor = "#7ee695";
			event.target.style.border = "1px solid #7ee695";

			setTimeout(() => {
				setSettings((prevSettings) => {
					return {
						...prevSettings,
						playerScore: prevSettings.playerScore + 1,
						gameCurrentQuestion: prevSettings.gameCurrentQuestion + 1,
					};
				});

				setLoading(false);
			}, 1000);
		} else if (choice !== question.correct) {
			event.target.style.backgroundColor = "#fa8e8e";
			event.target.style.color = "#fff";
			event.target.style.border = "1px solid #fa8e8e";
			correctRef.current.style.backgroundColor = "rgba(187, 255, 180, 0.449)";
			setTimeout(() => {
				setSettings((prevSettings) => {
					return {
						...prevSettings,
						gameCurrentQuestion: prevSettings.gameCurrentQuestion + 1,
					};
				});
				setLoading(false);
			}, 1000);
		} else {
			setSettings((prevSettings) => {
				return {
					...prevSettings,
					gameCurrentQuestion: prevSettings.gameCurrentQuestion + 1,
				};
			});
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="question">
				<h1
					className="question_title"
					onCopy={(e) => {
						e.preventDefault();
						return false;
					}}
				>
					{question.text}
				</h1>

				<div className="question_options">
					{question.choices.map((choice, index) => {
						return (
							<button
								className="option_awnsers"
								disabled={loading}
								onClick={(event) => onChange(event, choice.text)}
								key={index}
								ref={question.correct ? correctRef : null}
							>
								{choice.text}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
