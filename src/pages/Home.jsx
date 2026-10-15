import React from 'react';
import { useLoaderData } from 'react-router';
import NewsCard from '../components/NewsCard';

const Home = () => {
	const data = useLoaderData();
	return (
		<div>
			<h3 className="font-bold">
				Total: <span className="text-secondary">{data.length}</span> news found
			</h3>
			<div className="grid grid-cols-1 gap-5">
				{data.map((news) => (
					<NewsCard key={news.id} news={news}></NewsCard>
				))}
			</div>
		</div>
	);
};

export default Home;
