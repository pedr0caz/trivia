import React from "react";
import Signup from "./components/UI/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/UI/Home";
import Login from "./components/UI/Login";
import PrivateRoute from "./components/Routes/PrivateRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import ForgotPassword from "./components/UI/ForgotPassword";
import Nav from "./components/UI/Nav";
import Game from "./components/Game/Game";
import Ranking from "./components/UI/Ranking";
import Faq from "./components/UI/Faq";
import Contact from "./components/UI/Contact";

import "./App.css";
import BlogPost from "./components/UI/BlogPost";

function AppLogin() {
	return (
		<Router>
			<AuthProvider>
				<Nav />
				<main className="wrapper">
					<Routes>
						<Route
							path="/update-profile"
							element={
								<PrivateRoute>
									<UpdateProfile />
								</PrivateRoute>
							}
						/>

						<Route
							path="/game"
							element={
								<PrivateRoute>
									<Game />
								</PrivateRoute>
							}
						/>

						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/ranking" element={<Ranking />} />
						<Route path="/faq" element={<Faq />} />
						<Route path="/" element={<Home />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/blog/post/:id" element={<BlogPost />} />
					</Routes>
				</main>
			</AuthProvider>
		</Router>
	);
}

export default AppLogin;
