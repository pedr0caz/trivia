import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
	return (
		<div className="logo_area">
			<Link to="/">
				<img src="/images/giant.png" alt="" />
			</Link>
		</div>
	);
}
