import React from "react";

export default function Question() {
	return (
		<div>
			<div className="question">
				<h3 className="question_title">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
					dolor distinctio! Enim, quas hic accusamus quod saepe nisi cupiditate
					quae obcaecati veniam? Quam, doloribus deleniti reprehenderit
					inventore unde impedit quae.
				</h3>

				<hr />
				<div className="question_options">
					<button className="option_awnsers">A</button>
					<button className="option_awnsers">B</button>
					<button className="option_awnsers">C</button>
					<button className="option_awnsers">D</button>
				</div>
			</div>
		</div>
	);
}
