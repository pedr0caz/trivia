import React, { useState } from "react";
import Trivia from "./Trivia";
import CategoriesLevel from "./CategoriesLevel";
import QuestionList from "./QuestionList";
import Scorebox from "./Scorebox";
import Logo from "../UI/Logo";

export default function Game() {
	const [gameStart, setGameStart] = useState(true);
	const [customizingQuiz, setCustomizingQuiz] = useState(false);
	const [urlApi, setUrlApi] = useState("");
	const [customButton, setCustomButton] = useState({});

	const startTrivia = () => {
		setGameStart(false);
		setCustomizingQuiz(true);
	};

	const getData = (data) => {
		if (data.levels) {
			let url = `http://162.19.27.138/api.php?level=${data.levels}&category=${data.categories}&amount=10`;
			setUrlApi(url);
			setCustomButton({});
			setCustomizingQuiz(false);
		} else {
			setCustomButton({
				animation: "wiggle 500ms",
			});
			setTimeout(() => setCustomButton({}), 500);
		}
	};

	return (
		<section>
			<div className="game-container">
				{gameStart ? (
					<Trivia startTrivia={startTrivia} />
				) : (
					customizingQuiz && (
						<CategoriesLevel getData={getData} customButton={customButton} />
					)
				)}
				{!gameStart && !customizingQuiz && (
					<div className="quiz-container">
						<Logo />
						<Scorebox />
						<QuestionList />
					</div>
				)}
			</div>
		</section>
	);
}
