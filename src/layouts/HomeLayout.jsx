import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Header from '../components/Header';
import LatestNews from '../components/LatestNews';
import Navbar from '../components/Navbar';
import LeftAside from '../components/homelayout/LeftAside';
import RightAside from '../components/homelayout/RightAside';
import Loading from '../components/Loading';

const HomeLayout = () => {
	const { state } = useNavigation();

	return (
		<div>
			<header className="sticky top-0 z-50 bg-base-100">
				<Header></Header>
				<section className="w-11/12 mx-auto my-3">
					<LatestNews></LatestNews>
				</section>
				<nav className="w-11/12 mx-auto my-3">
					<Navbar></Navbar>
				</nav>
			</header>
			<main className="w-11/12 mx-auto my-3 grid grid-cols-12 gap-5">
				<aside className="col-span-3 sticky top-65 h-fit">
					<LeftAside></LeftAside>
				</aside>
				<section className="col-span-6">
					{state == 'loading' ? <Loading /> : <Outlet></Outlet>}
				</section>
				<aside className="col-span-3 sticky top-60 h-fit">
					<RightAside></RightAside>
				</aside>
			</main>
		</div>
	);
};

export default HomeLayout;
