import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { useAuth } from "../../contexts/AuthContext";
export default function Ranking() {
	const { getNotes } = useAuth();
	const [loading, setLoading] = useState(undefined);
	const [ranking, setRanking] = useState(null);

	useEffect(() => {
		setLoading(true);
		getNotes()
			.then(async (note) => {
				setRanking(note.sort((a, b) => b.points - a.points));
			})
			.catch((error) => {

			}).finally(() => {
				setLoading(false);
			})
	}, []);

	if (loading) {
		return (
			<div className="app">
				<div className="loading-spinner"></div>
			</div>
		);
	}
	return (
		<section>
			<Logo />
			{ranking && !loading && (
				<div className="table-ranking">
					<h1>Ranking</h1>
					<div className="table-wrapper">
						<table>
							<thead>
								<tr>
									<th>Rank</th>
									<th>Player</th>
									<th>Points</th>
								</tr>
							</thead>
							<tbody>
								{ranking.map((x, index) => {
									return (
										<tr key={index}>
											<td className="rank">{index + 1}</td>
											<td className="team">{x.displayName}</td>
											<td className="points">{x.points}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</section>
	);
}
