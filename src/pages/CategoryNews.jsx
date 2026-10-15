import React, { useMemo } from 'react';
import { useLoaderData, useParams } from 'react-router';
import NewsCard from '../components/NewsCard';

const CategoryNews = () => {
	const { id } = useParams();
	const data = useLoaderData();
	// console.log(id, data);
	const categoryNews = useMemo(() => {
		if (!data) return [];

		if (id === '0') {
			return data;
		}

		if (id === '1') {
			return data.filter((news) => news.others?.is_today_pick === true);
		}

		return data.filter((news) => news.category_id == id);
	}, [id, data]);

	return (
		<div>
			<h3 className="font-bold">
				Total: <span className="text-secondary">{categoryNews.length}</span>{' '}
				news found
			</h3>
			<div className="grid grid-cols-1 gap-5">
				{categoryNews.map((news) => (
					<NewsCard key={news.id} news={news}></NewsCard>
				))}
			</div>
		</div>
	);
};

export default CategoryNews;
