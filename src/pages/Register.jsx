import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const Register = () => {
	const { createUser, setUser, updateUser } = use(AuthContext);
	const [nameError, setNameError] = useState('');
	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const { name, email, password, photo } = Object.fromEntries(
			formData.entries()
		);
		if (name.length < 5) {
			setNameError('Name should be more than 5 character');
			return;
		} else {
			setNameError('');
		}
		console.log(name);
		createUser(email, password)
			.then((res) => {
				const user = res.user;
				console.log(user);
				updateUser({
					displayName: name,
					photoURL: photo,
				})
					.then(() => {
						setUser({ ...user, displayName: name, photoURL: photo });
					})
					.catch((err) => {
						console.error(err);
						setUser(user);
					});

				if (res.user) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'User created successfully!',
						showConfirmButton: false,
						timer: 1500,
					});
					form.reset();
					navigate('/');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="flex justify-center min-h-screen items-center">
			<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-3">
				<h2 className="font-semibold text-3xl text-center">
					Login to your account
				</h2>
				<form onSubmit={handleRegister} className="card-body">
					<fieldset className="fieldset">
						<label className="label">Name</label>
						<input
							type="text"
							name="name"
							className="input"
							placeholder="Name"
							required
						/>
						{nameError && <p className="text-red-400 text-xs">{nameError}</p>}
						<label className="label">Photo</label>
						<input
							type="text"
							name="photo"
							className="input"
							placeholder="Photo URL"
						/>
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
						<button className="btn btn-neutral mt-4">Register</button>
						<p className="font-semibold text-center pt-5">
							Already Have an account ?{' '}
							<Link className="text-secondary" to="/auth/login">
								Login
							</Link>
						</p>
					</fieldset>
				</form>
			</div>
		</div>
	);
};

export default Register;
