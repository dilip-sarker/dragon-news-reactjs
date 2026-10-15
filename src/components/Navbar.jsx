import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import userImage from '../assets/user.png';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import Loading from './Loading';

const Navbar = () => {
	const { user, logOut, loading } = use(AuthContext);

	if (loading) {
		return <Loading></Loading>;
	}

	const handleLogOut = () => {
		logOut()
			.then(() => {
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Successfully logged out!',
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="flex justify-between items-center">
			<p>{user?.email}</p>
			<div className=""></div>
			<div className="flex gap-5 text-accent">
				<NavLink to="/home">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/career">Career</NavLink>
			</div>
			<div className="flex gap-5 justify-center items-center">
				<img
					className="w-12 h-12 rounded-full"
					src={`${user ? user.photoURL : userImage}`}
					alt=""
				/>
				{user ? (
					<button onClick={handleLogOut} className="btn btn-primary">
						Logout
					</button>
				) : (
					<Link to="/auth/login" className="btn btn-primary">
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
