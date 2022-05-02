import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function CategoriesLevel({ getData, customButton }) {
	const [loading, setLoading] = useState(false);
	const [catOptions, setCatOptions] = useState({
		categories: [],
		levels: [
			{ level: "easy", isSelected: false, key: nanoid() },
			{ level: "medium", isSelected: false, key: nanoid() },
			{ level: "hard", isSelected: false, key: nanoid() },
		],
	});
	const [apiUrlData, setApiUrlData] = useState({
		categories: "",
		levels: "",
	});

	useEffect(() => {
		setLoading(true);
		fetch("http://162.19.27.138/api.php?categories")
			.then((res) => res.json())
			.then((data) => {
				setCatOptions((prevCatOptions) => {
					return {
						...prevCatOptions,
						categories: data.map((category) => {
							return {
								...category,
								isSelected: category.id !== 0 ? false : true,
								key: nanoid(),
							};
						}),
					};
				});
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleClick = (type, data) => {
		setApiUrlData((prevApiUrlData) => ({ ...prevApiUrlData, [type]: data }));
		setCatOptions((prevState) => {
			return {
				...prevState,
				[type]: prevState[type].map((item) => {
					if (item.isSelected) {
						return { ...item, isSelected: false };
					}
					if (item.id === data || item.level === data) {
						return { ...item, isSelected: true };
					}
					return { ...item };
				}),
			};
		});
	};

	const categoryElements = catOptions.categories.map((category) => {
		return (
			<li
				className="option"
				onClick={() => handleClick("categories", category.id)}
				style={
					category.isSelected
						? {
								backgroundColor: "#d4ac0d",
								color: "#F5F7FB",
								border: "1px solid #d4ac0d",
						  }
						: null
				}
				key={category.key}
			>
				{category.name}
			</li>
		);
	});

	const levelElements = catOptions.levels.map((item) => {
		return (
			<li
				className="option"
				onClick={() => handleClick("levels", item.level)}
				style={
					item.isSelected
						? {
								backgroundColor: "#d4ac0d",
								color: "#F5F7FB",
								border: "1px solid #d4ac0d",
						  }
						: null
				}
				key={item.key}
			>
				{item.level.charAt(0).toUpperCase() + item.level.slice(1)}
			</li>
		);
	});

	if (loading) {
		return (
			<div>
				<div className="loading-spinner"></div>
			</div>
		);
	}
	
	return (
		<div className="category-container">
			<h3 className="category-header">Select a category</h3>
			<ul className="category-options">{categoryElements}</ul>
			<h3 className="category-header category-level">Select Level</h3>
			<ul className="category-options category-options-level">
				{levelElements}
			</ul>
			<button
				className="start-trivia-btn"
				onClick={() => getData(apiUrlData)}
				style={customButton}
			>
				Start
			</button>
		</div>
	);
}
