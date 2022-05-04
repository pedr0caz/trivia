import React from "react";
import Question from "./Question";

export default function QuestionList(props) {
	const { questions } = props;
	return (
		<div className="questions">
			{questions.map((question) => {
				if (question.id === props.current) {
					return <Question question={question} key={question.id} {...props} />;
				} else {
					return null;
				}
			})}
		</div>
	);
}

