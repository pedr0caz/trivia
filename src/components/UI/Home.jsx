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
				"https://www.mohawkcollege.ca/sites/default/files/styles/gallery_large/public/Alumni/Alumni%20Events/Online%20Alumni%20Events/Trivia%20Night%20Image_780x430.jpg?itok=f_2l7DsC",
		},
		{
			index: 1,
			headline: "Play with your friends!",
			text: "Challenge your friends, find out who gets more points!",
			src:
				"https://res.cloudinary.com/movespring/image/upload/v1618329924/blog/invite_main_images_442870d6ed.png",
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
				"https://saffroninteractive.com/wp-content/uploads/2014/09/Knowledge.png",
		},
	];

	return (
		<section>
			<Logo />
			<Cards data={newsData} />
		</section>
	);
}
