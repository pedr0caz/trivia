import React from "react";
import Pie from "../UI/Pie";
import { useAuth } from "../../contexts/AuthContext";
export default function EndGame({settings}) {
	const percent = (settings.playerScore / settings.gameQuestions.length) * 100;
	const { currentUser, setUserRanking } = useAuth();
	try {
		setUserRanking(currentUser.displayName, currentUser.uid, settings.playerScore);
	} catch (e) {
		console.error(e);
	}
	return (
		<div>
			<>
				<center>
					<h1>You got {settings.playerScore} correct answers</h1>
					<Pie percentage={percent} colour="#f7dd79" />
				</center>
				<center>You added {settings.playerScore} points to your total points </center>
				<center>Total Points {settings.playerScore} </center>
				<center>
					<button>Play Again</button>
				</center>
			</>
		</div>
	);
}
