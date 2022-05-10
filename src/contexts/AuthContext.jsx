import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";

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
import {
	doc,
	updateDoc,
	getDoc,
	increment,
	setDoc,
	collection,
	query,
	where,
	getDocs
} from "firebase/firestore";
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
				await updateProfile(auth.currentUser, {
					displayName: nick,
				})
					.then(() => {
						setCurrentUser((prevState) => {
							return {
								...prevState,
								displayName: nick,
							};
						}).then(() => {
							setUserRanking(nick, currentUser.uid);
							return true;
						});
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

	const setUserRanking = async (name, uid, add) => {
		const docRef = doc(db, "ranking", uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			await updateDoc(docRef, {
				displayName: name,
				points: increment(add),
			});
		} else {
			await setDoc(doc(db, "ranking", uid), {
				displayName: name,
				points: add,
			});
		}
	};

	const getNotes = async () => {
		const notesSnapshot = await getDocs(collection(db, "ranking"));
		const notesList = notesSnapshot.docs.map((doc) => doc.data());
		return notesList;
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
		setCurrentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail_,
		updatePassword_,
		signInWithGoogle,
		setUserRanking,
		getNotes,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
