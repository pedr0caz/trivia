import React from "react";
import Logo from "./Logo";
import newsData from "../../data.json";
import Cards from "./Cards";
export default function Home() {
	return (
		<section>
			<Logo />
			<Cards data={newsData} />
		</section>
	);
}
