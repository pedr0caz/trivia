import React from "react";
import Logo from "./Logo";

export default function Ranking() {
	return (
		<section>
			<Logo />
			<div class="table-ranking">
				<h1>Ranking</h1>
				<div class="table-wrapper">
					<table>
						<thead>
							<tr>
								<th>Rank</th>
								<th>Player</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="rank">1</td>
								<td class="team">A</td>
								<td class="points">1460</td>
							</tr>
							<tr>
								<td class="rank">2</td>
								<td class="team">B</td>
								<td class="points">1340</td>
							</tr>
							<tr>
								<td class="rank">3</td>
								<td class="team">C</td>
								<td class="points">1245</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
