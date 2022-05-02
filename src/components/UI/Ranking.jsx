import React from "react";
import Logo from "./Logo";

export default function Ranking() {
	return (
		<section>
			<Logo/>
			<div className="ptable">
				<h1 className="headin">Ranking</h1>
				<table>
					<thead>
						<tr className="col">
							<th>#</th>
							<th>Player</th>
							<th>Points</th>
						</tr>
					</thead>

					<tbody>
						<tr className="wpos">
							<td>1</td>
							<td>Test</td>
							<td>100</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}
