import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layouts/HomeLayout';
import Home from '../pages/Home';
import CategoryNews from '../pages/CategoryNews';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from '../layouts/AuthLayout';
import NewsDetails from '../pages/NewsDetails';
import PrivateRoute from './PrivateRoute';
import Loading from '../components/Loading';

export const router = createBrowserRouter([
	{
		path: '/',
		Component: HomeLayout,
		children: [
			{
				index: true,
				Component: Home,
				loader: () => fetch('/news.json'),
				hydrateFallbackElement: <Loading></Loading>,
			},
			{
				path: '/category/:id',
				Component: CategoryNews,
				loader: () => fetch('/news.json'),
				hydrateFallbackElement: <Loading></Loading>,
			},
		],
	},
	{
		path: '/auth',
		Component: AuthLayout,
		children: [
			{
				path: '/auth/login',
				Component: Login,
			},
			{
				path: '/auth/register',
				Component: Register,
			},
		],
	},

	{
		path: '/news-details/:id',

		loader: () => fetch('/news.json'),

		element: (
			<PrivateRoute>
				<NewsDetails></NewsDetails>
			</PrivateRoute>
		),
		hydrateFallbackElement: <Loading></Loading>,
	},
]);
