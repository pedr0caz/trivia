import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
	
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
	sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	}
		

	const login =  (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	}

	const logout = () => {
		return signOut(auth);
	}

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	}

	const updateEmail_ = (email) => {
		return updateEmail(currentUser, email);
	}

	const updatePassword_ = (password) => {
		return updatePassword(currentUser, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail_,
		updatePassword_,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
