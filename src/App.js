import React from "react";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";
import Nav from "./components/Nav";
import Trivia from "./components/Trivia";
import Ranking from "./components/Ranking";

import "./App.css";

function AppLogin() {
	return (
		<Router>
			<AuthProvider>
				<Nav />
				<main className="wrapper">
					<div style={{ maxWidth: "400px" }}>
						<Routes>
							<Route
								exact
								path="/"
								element={
									<PrivateRoute>
										<Home />
									</PrivateRoute>
								}
							/>
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
										<Trivia />
									</PrivateRoute>
								}
							/>

							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/ranking" element={<Ranking />} />
						</Routes>
					</div>
				</main>
			</AuthProvider>
		</Router>
	);
}

export default AppLogin;
