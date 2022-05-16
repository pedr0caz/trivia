import React, { useState, useEffect } from "react";
import Pie from "../UI/Pie";
import { useAuth } from "../../contexts/AuthContext";
export default function EndGame({ settings, startAgain }) {
	const percent = (settings.playerScore / settings.gameQuestions.length) * 100;
	const { currentUser, setUserRanking, getPoints } = useAuth();
	const [points, setPoints] = useState(0);

	useEffect(() => {
		setUserRanking(
			currentUser.displayName,
			currentUser.uid,
			settings.playerScore
		).then(() => {
			getPoints(currentUser.uid).then(function (result) {
				setPoints(result);
			});
		}); // eslint-disable-next-line
	}, []);
	return (
		<div>
			<>
				<center>
					<h1>You got {settings.playerScore} correct answers</h1>
					<Pie percentage={percent} colour="#f7dd79" />
				</center>
				<center>
					You added {settings.playerScore} points to your total points{" "}
				</center>
				<center>Total Points {points}</center>
				<center>
					<button onClick={() => startAgain()}>Play Again</button>
				</center>
			</>
		</div>
	);
}
