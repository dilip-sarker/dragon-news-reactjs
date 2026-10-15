import React, { useEffect, useState } from 'react';
// import {  createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from './AuthContext';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const LogInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const updateUser = (updatedData) => {
		return updateProfile(auth.currentUser, updatedData);
	};

	const logOut = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
			console.log('has current user:', currentUser?.email);
		});
		return () => {
			unSubscribe();
		};
	}, []);
	const authInfo = {
		user,
		setUser,
		loading,
		setLoading,
		createUser,
		LogInUser,
		updateUser,
		logOut,
	};
	return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
