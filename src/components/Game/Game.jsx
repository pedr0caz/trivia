import React, { useState, useEffect } from "react";
import Trivia from "./Trivia";
import CategoriesLevel from "./CategoriesLevel";
import QuestionList from "./QuestionList";
import Scorebox from "./Scorebox";
import Logo from "../UI/Logo";
import { decode } from "html-entities";
import { Buffer } from "buffer";

import EndGame from "./EndGame";

export default function Game() {
	const [urlApi, setUrlApi] = useState("");
	const [customButton, setCustomButton] = useState({});
	const [loading, setLoading] = useState(undefined);
	const [settings, setSettings] = useState({
		gameLoaded: true,
		gameSettings: false,
		gameQuestions: [],
		gameCurrentQuestion: 0,
		playerScore: 0,
		gameTime: 0,
		gameTimeBar: 0,
	});

	const startTrivia = () => {
		setSettings((prevSettings) => {
			return {
				...prevSettings,
				gameLoaded: false,
				gameSettings: true,
			};
		});
	};

	const endTrivia = () => {
		setSettings((prevSettings) => {
			return {
				gameLoaded: false,
				gameSettings: true,
				gameQuestions: [],
				gameCurrentQuestion: 0,
				playerScore: 0,
				gameTime: 0,
				gameTimeBar: 0,
			};
		});
	};

	const getData = (data) => {
		if (data.levels) {
			let url = `http://162.19.27.138/api.php?level=${data.levels}&category=${data.categories}&amount=10`;
			setUrlApi(url);
			setCustomButton({});
			setSettings((prevSettings) => {
				return {
					...prevSettings,
					gameSettings: false,
				};
			});
		} else {
			setCustomButton({
				animation: "wiggle 500ms",
			});
			setTimeout(() => setCustomButton({}), 500);
		}
	};

	const reverseString = (str) => {
		return str.split("").reverse().join("");
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
			.then(async (res) => await res.json())
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

				setSettings((prevSettings) => {
					return {
						...prevSettings,
						gameQuestions: Data,
					};
				});
			})
			.catch((err) => err)
			.finally(() => setLoading(false));
	}, [urlApi]);

	useEffect(() => {
		if (settings.gameTime > 59) {
			setSettings((prevSettings) => {
				return {
					...prevSettings,
					gameCurrentQuestion: 100,
				};
			});
		}
	}, [settings.gameTime]);

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
				{settings.gameLoaded ? (
					<Trivia startTrivia={startTrivia} />
				) : (
					settings.gameSettings && (
						<CategoriesLevel getData={getData} customButton={customButton} />
					)
				)}
				{!settings.gameLoaded && !settings.gameSettings && (
					<div className="quiz-container">
						<Logo />
						{settings.gameCurrentQuestion < settings.gameQuestions.length ? (
							<>
								<Scorebox settings={settings} setSettings={setSettings} />
								<QuestionList settings={settings} setSettings={setSettings} />
							</>
						) : (
							<EndGame settings={settings} startAgain={endTrivia} />
						)}
					</div>
				)}
			</div>
		</section>
	);
}
