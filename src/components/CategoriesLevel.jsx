import { useState, useEffect } from "react";

export default function CategoriesLevel() {
	return (
		<div className="category-container">
			<h3 className="category-header">Select a category</h3>
			<ul className="category-options">A b c</ul>
			<h3 className="category-header category-level">
				Select Level
			</h3>
			<ul className="category-options category-options-level">
				easy, medium, hard
			</ul>
			<button className="start-trivia-btn">Start</button>
		</div>
	);
}
