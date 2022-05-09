import React from "react";

export default function Cards({ data }) {
	return (
		<div className="content-wrapper">
			{data.map((data,index) => {
				return (
					<div className="news-card">
						
						<img src={data.src} alt="" className="news-card_image" />
						<div className="news-card_text-wrapper">
							<h2 className="news-card_title">{data.headline}</h2>
							<div className="news-card_post-date">Jan 29, 2018</div>
							<div className="news-card_details-wrapper">
								<p className="news-card_excerpt">
								{data.text}
								</p>
							
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
