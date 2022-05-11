import React from "react";
import Question from "./Question";

export default function QuestionList({ settings, setSettings }) {
	return (
		<div className="questions">
			{settings.gameQuestions.map((question) => {
				if (question.id === settings.gameCurrentQuestion) {
					return (
						<Question
							question={question}
							key={question.id}
							settings={settings}
							setSettings={setSettings}
						/>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
}
