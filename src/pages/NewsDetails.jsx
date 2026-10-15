import React, { useMemo } from 'react';
import { useLoaderData, useParams } from 'react-router';
import Header from '../components/Header';
import RightAside from '../components/homelayout/RightAside';
import NewsDetailsCard from '../components/NewsDetailsCard';

const NewsDetails = () => {
	const data = useLoaderData();
	const { id } = useParams();

	const newsDetails = useMemo(() => {
		return data.find((singleNews) => singleNews.id === id);
	}, [data, id]);

	return (
		<div>
			<header className="py-3">
				<Header></Header>
			</header>
			<main className="w-11/12 mx-auto grid grid-cols-12 gap-5">
				<section className="col-span-9">
					<h2 className="font-bold mb-5">News Details</h2>
					<NewsDetailsCard news={newsDetails}></NewsDetailsCard>
				</section>
				<aside className="col-span-3">
					<RightAside></RightAside>
				</aside>
			</main>
		</div>
	);
};

export default NewsDetails;
