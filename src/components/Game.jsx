import { useState } from "react";
import Trivia from "./Trivia";

export default function Game() {
	const [gameStart, setGameStart] = useState(true);
	const [customizingQuiz, setCustomizingQuiz] = useState(false);

	const startTrivia = () => {
		setGameStart(false);
		setCustomizingQuiz(true);
	}

	return (
		<div className="game-container">
			{gameStart ? <Trivia startTrivia={startTrivia} /> : "Choose cat"}
		</div>
	);
}