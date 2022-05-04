import React, { useState, useEffect } from "react";
import Trivia from "./Trivia";
import CategoriesLevel from "./CategoriesLevel";
import QuestionList from "./QuestionList";
import Scorebox from "./Scorebox";
import Logo from "../UI/Logo";
import { decode } from "html-entities";

export default function Game() {
	const [gameStart, setGameStart] = useState(true);
	const [customizingQuiz, setCustomizingQuiz] = useState(false);
	const [urlApi, setUrlApi] = useState("");
	const [customButton, setCustomButton] = useState({});
	const [questions, setQuestions] = useState([]);
	const [score, setScore] = useState(0);
	const [current, setCurrent] = useState(0);
	const [loading, setLoading] = useState(undefined);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [progress, setProgress] = useState(0);

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

	const reverseString = (str) => {
		return str
			.split("")
			.reverse()
			.join("");
	};

	const decodeBase64 = (str) => {
		return Buffer.from(str, "base64").toString("ascii");
	};

	const decodeHtmlEntities = (str) => {
		return decode(str);
	};

	useEffect(() => {
		setLoading(true);
		fetch(urlApi)
			.then((res) => res.json())
			.then((data) => {
				const Data = data.map((item, index) => {
					const correctAwnser = decodeHtmlEntities(
						decodeBase64(reverseString(item.correct_answer))
					);
					const wrongAwnsers = item.incorrect_answers.map((answer) =>
						decodeHtmlEntities(decodeBase64(reverseString(answer)))
					);
					let allAnswers = [];
					for (let i of wrongAwnsers) {
						allAnswers.push(i);
					}
					const randomNum = Math.floor(Math.random() * 4);
					allAnswers.splice(randomNum, 0, correctAwnser);

					return {
						id: index,
						category: item.category,
						type: item.type,
						difficulty: item.difficulty,
						text: decodeHtmlEntities(item.question.trim()),
						correct: correctAwnser,
						incorrect: wrongAwnsers,
						choices: allAnswers.map((answer) => ({
							text: answer,
						})),
					};
				});
				setQuestions(Data);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [urlApi]);

	
	useEffect(() => {
		if(elapsedTime > 59)  {
			console.log('time over')
		}
	
	},[elapsedTime])

	if (loading) {
		return (
			<div className="app">
				<div className="loading-spinner"></div>
			</div>
		);
	}

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
						<Scorebox
							questions={questions}
							score={score}
							current={current}
							loading={loading}
							progress={progress}
							elapsedTime={elapsedTime}
							setProgress={setProgress}
							setElapsedTime={setElapsedTime}
						/>
						<QuestionList
							questions={questions}
							score={score}
							current={current}
							loading={loading}
							setCurrent={setCurrent}
							setScore={setScore}
						/>
					</div>
				)}
			</div>
		</section>
	);
}
