import React from "react";
import Logo from "./Logo";
import { useParams } from "react-router-dom";
import newsData from "../../data.json";

export default function BlogPost(props) {
	const { id } = useParams();

	const { headline, blogPost, src, date } = newsData.find(
		(item) => item.index === parseInt(id)
	);
	console.log(id);
	return (
		<section>
			<Logo />
			<article className="blog-post">
				<div className="featured-image">
					<img src={src} alt="" />
				</div>
				<h1 className="post-title">{headline}</h1>

				<div className="post-content">
					<p>{blogPost}</p>
				</div>
				<footer className="post-footer">
					<p>
						<span className="date">{date}</span>
					</p>
				</footer>
			</article>
		</section>
	);
}
