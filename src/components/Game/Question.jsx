import React, { useState, useRef } from "react";

export default function Question({ question, settings, setSettings }) {
	const correctRef = useRef();
	const [customButton, setCustomButton] = useState({});
	const [customButton2, setCustomButton2] = useState({});
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

		if (choice) {
			if (choice !== question.correct) {
				setCustomButton2({
					backgroundColor: "#7ee695",
					border: "1px solid #7ee695",
				});
			}
			setCustomButton({
				color: "#8f96bd",
				border: "1px solid #8f96bd",
			});
		}
	};

	return (
		<div>
			<div className="question">
				<h1 className="question_title">{question.text}</h1>

				<div className="question_options">
					{question.choices.map((choice, index) => {
						return (
							<button
								className="option_awnsers"
								style={question.correct ? customButton : customButton2}
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
