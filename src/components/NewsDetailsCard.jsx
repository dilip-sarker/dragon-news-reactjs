import React from 'react';
import { Link } from 'react-router';

const NewsDetailsCard = ({ news }) => {
	const { category_id, title, image_url, details } = news;
	return (
		<div className="space-y-5">
			<img className="w-full `h-87.5` object-fit" src={image_url} alt="" />
			<h1 className="text-2xl">Title: {title}</h1>
			<p>{details}</p>
			<Link className="btn btn-secondary" to={`/category/${category_id}`}>
				Back to category news
			</Link>
		</div>
	);
};

export default NewsDetailsCard;
