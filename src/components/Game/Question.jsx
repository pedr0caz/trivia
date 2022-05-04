import React, { useState } from "react";

export default function Question(props) {
	const { question } = props;

	const [customButton, setCustomButton] = useState({});
	const [customButton2, setCustomButton2] = useState({});
	const [loading, setLoading] = useState(false);

	const onChange = (event, choice) => {
		event.preventDefault();
		setLoading(true);
		const { setCurrent, setScore, question } = props;
		if (choice === question.correct) {
			event.target.style.backgroundColor = "#7ee695";
			event.target.style.border = "1px solid #7ee695";

			setTimeout(() => {
				setScore(props.score + 1);
				setCurrent(props.current + 1);
				setLoading(false);
			}, 1000);
		} else if (choice !== question.correct) {
			event.target.style.backgroundColor = "#fa8e8e";
			event.target.style.color = "#fff";
			event.target.style.border = "1px solid #fa8e8e";
			setTimeout(() => {
				setCurrent(props.current + 1);
				setLoading(false);
			}, 1000);
		} else {
			setCurrent(props.current + 1);
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
