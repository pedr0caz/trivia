import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { useAuth } from "../../contexts/AuthContext";

export default function Ranking() {
	const { getNotes } = useAuth();
	const [loading, setLoading] = useState(undefined);
	const [ranking, setRanking] = useState(null);
	
	const details = [
		{ name: "pos", display: "#" },
		{ name: "displayName", display: "Player" },
		{ name: "points", display: "Score" },
	];

	useEffect(() => {
		setLoading(true);
		getNotes()
			.then(async (note) => {
				const sort = note.sort((a, b) => b.points - a.points);

				const addPos = sort.map((item, index) => {
					return {
						pos: index + 1,
						displayName: item.displayName,
						points: item.points,
					};
				});
				setRanking(addPos);
			})
			.catch((error) => {})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	console.log(ranking);
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
			<div className="table-ranking">
				<h1>Ranking</h1>
				<SearchTable details={details} data={ranking} />
			</div>
		</section>
	);
}

function SearchTable(props) {
	const [table, setTable] = useState({
		data: props.data,
		currentData: props.data,
		pageOfItems: [],
	});

	const [sorted, setSorted] = useState(
		props.details.reduce((accum, item) => {
			accum[item.name] = null;
			return accum;
		}, {})
	);
	console.log(sorted);
	const onChangePage = (pageOfItems) => {
		setTable((prevTable) => {
			return {
				...prevTable,
				pageOfItems: pageOfItems,
			};
		});
	};

	const search = (e) => {
		let search = e.target.value.toLowerCase();
		let filter = (item) => {
			for (let key in item) {
				if (
					props.details.map((i) => i.name).includes(key) &&
					item[key]
						.toString()
						.toLowerCase()
						.includes(search)
				) {
					return item;
				}
			}
		};
		let data = table.data.filter(filter);
		setTable((prevTable) => {
			return {
				...prevTable,
				currentData: data.length > 0 ? data : [{}],
			};
		});
	};

	const sort = (e) => {
		let value = e.target.id || e.target.parentNode.id;
		let isSorted = sorted[value];
		let direction = isSorted ? 1 : -1;
		let sort = (a, b) => {
			if (typeof a[value] === "number" && typeof b[value] === "number") {
				{
					if (a[value] > b[value]) {
						return direction;
					}
					if (a[value] < b[value]) {
						return direction * -1;
					}
					return 0;
				}
			} else {
				{
					if (a[value].toLowerCase() > b[value].toLowerCase()) {
						return direction;
					}
					if (a[value].toLowerCase() < b[value].toLowerCase()) {
						return direction * -1;
					}
					return 0;
				}
			}
		};

		setSorted((prevSort) => {
			return {
				...prevSort,
				[value]: !isSorted,
			};
		});
		let sorted2 = table.currentData.slice().sort(sort);
		let sortedData = table.data.slice().sort(sort);

		setTable((prevTable) => {
			return {
				...prevTable,
				data: sortedData,
				currentData: sorted2,
			};
		});
	};

	return (
		<>
			<div class="header">
				<Search search={search} />
				<Pagination items={table.currentData} onChangePage={onChangePage} />
			</div>
			<div className="table-wrapper">
				{table.pageOfItems &&
					Object.keys(table.pageOfItems[0] || {}).length !== 0 && (
						<table>
							<HeadTable
								details={props.details}
								sort={sort}
								sortCheck={sorted}
							/>
							<tbody>
								{table.pageOfItems.map((a, index) => (
									<tr key={index} id={a.id}>
										{props.details.map((item, i) => {
											return (
												<td
													className="rank"
													key={`${a[item.name]}_${index}_${i}`}
												>
													{a[item.name]}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					)}
				{!(
					table.pageOfItems &&
					Object.keys(table.pageOfItems[0] || {}).length !== 0
				) && (
					<table>
						<tbody>
							<tr>
								<td>No results found</td>
							</tr>
						</tbody>
					</table>
				)}
			</div>
		</>
	);
}

function Search(props) {
	return (
		<div class="search">
			<input type="text" class="search__input" onKeyUp={props.search} />

			<i className="search__icon fi fi-rr-search"></i>
		</div>
	);
}

function HeadTable(props) {
	return (
		<thead>
			<tr id="headTable">
				{props.details.map((item) => {
					return (
						<th
							key={item.name}
							id={item.name}
							onClick={props.sort}
							style={{ width: `${100 / props.details.length}%` }}
						>
							{item.display} <i class="fi fi-rr-sort"></i>
						</th>
					);
				})}
			</tr>
		</thead>
	);
}

Pagination.defaultProps = {
	initialPage: 1,
	pageSize: 5,
};

function Pagination(props) {
	const [pagination, setPagination] = useState({
		xPager: {},
	});

	const setPage = (page) => {
		const { items, pageSize } = props;
		let pager = pagination.xPager;

		if (page < 1 || page > pager.totalPages) {
			return;
		}

		pager = getPager(items.length, page, pageSize);

		const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

		setPagination({ xPager: pager });

		props.onChangePage(pageOfItems);
	};

	const getPager = (totalItems, currentPage, pageSize) => {
		currentPage = currentPage || 1;

		const totalPages = Math.ceil(totalItems / pageSize);

		let startPage, endPage;
		if (totalPages <= 3) {
		
			startPage = 1;
			endPage = totalPages;
		} else {
			
			if (currentPage <= 2) {
				startPage = 1;
				endPage = 3;
			} else if (currentPage + 1 >= totalPages) {
				startPage = totalPages - 2;
				endPage = totalPages;
			} else {
				startPage = currentPage - 1;
				endPage = currentPage + 1;
			}
		}

		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		const pages = [...Array(endPage + 1 - startPage).keys()].map(
			(i) => startPage + i
		);

		return {
			totalItems,
			currentPage,
			pageSize,
			totalPages,
			startPage,
			endPage,
			startIndex,
			endIndex,
			pages,
		};
	};

	useEffect(() => {
		if (props.items && props.items.length) {
			setPage(props.initialPage);
		}
	}, [props.items]);

	const pager = pagination.xPager;

	if (!pager.pages || pager.pages.length <= 1) {
		return null;
	}

	return (
		<ul className="pagination">
			{pager.pages.map((page, index) => (
				<li
					key={index}
					className={pager.currentPage === page ? "active" : ""}
					onClick={() => setPage(page)}
				>
					<a>{page}</a>
				</li>
			))}
		</ul>
	);
}
