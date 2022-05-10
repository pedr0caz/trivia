import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
	sendPasswordResetEmail,
	updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = async (nick, email, password) => {
		await createUserWithEmailAndPassword(auth, email, password).then(
			async () => {
				updateProfile(auth.currentUser, {
					displayName: nick,
				})
					.then(() => {
						return true;
					})
					.catch((error) => {
						return false;
					});
			}
		);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const updateEmail_ = (email) => {
		return updateEmail(currentUser, email);
	};

	const updatePassword_ = (password) => {
		return updatePassword(currentUser, password);
	};

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

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
		signInWithGoogle,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
