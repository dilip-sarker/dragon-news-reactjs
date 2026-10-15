import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
	const [error, setError] = useState('');

	const { LogInUser, setLoading } = use(AuthContext);

	const location = useLocation();
	const navigate = useNavigate();

	const handleLogIn = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const { email, password } = Object.fromEntries(formData.entries());
		// console.log(name);
		LogInUser(email, password)
			.then((res) => {
				// const user = res.user;
				// console.log(user);
				if (res.user) {
					navigate(`${location.state ? location.state : '/'}`);
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'You successfully logged in!',
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				// console.error(err);
				const errorCode = err.code;
				setError(errorCode);
			});
	};

	return (
		<div className="flex justify-center min-h-screen items-center">
			<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-3">
				<h2 className="font-semibold text-3xl text-center">
					Login to your account
				</h2>
				<form onSubmit={handleLogIn} className="card-body">
					<fieldset className="fieldset">
						<label className="label">Email</label>
						<input
							type="email"
							name="email"
							className="input"
							placeholder="Email"
							required
						/>
						<label className="label">Password</label>
						<input
							type="password"
							name="password"
							className="input"
							placeholder="Password"
							required
						/>
						<div>
							<a className="link link-hover">Forgot password?</a>
						</div>
						{error && <p className="text-red-400 text-xs">{error}</p>}
						<button className="btn btn-neutral mt-4">Login</button>
						<p className="font-semibold text-center pt-5">
							Don't Have an account ?{' '}
							<Link className="text-secondary" to="/auth/register">
								Register
							</Link>
						</p>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default Login;
