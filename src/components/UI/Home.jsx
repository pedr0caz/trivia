import React from "react";
import Logo from "./Logo";

import Cards from "./Cards";
export default function Home() {
	const newsData = [
		{
			index: 0,
			headline: "Oficial Release",
			text:
				"Now the game is open ! Free to play and conquer the knowledge throne",
			src:
				"https://i.imgur.com/b9O4SQg.jpeg",
		},
		{
			index: 1,
			headline: "Play with your friends!",
			text: "Challenge your friends, find out who gets more points!",
			src:
				"https://i.imgur.com/WepndB6.png",
		},
		{
			index: 2,
			headline: "Play on your mobile device!",
			text: "Feel free to play on your mobile device we're responsive!",
			src: "https://i.imgur.com/qWaiDYU.png",
		},
		{
			index: 3,
			headline: "Improve your knowledge!",
			text: "lorem ipsum dolor sit amet, consectetur adip",
			src:
				"https://i.imgur.com/BnWeYZH.png",
		},
	];

	return (
		<section>
			<Logo />
			<Cards data={newsData} />
		</section>
	);
}
