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

import "./App.css";

function AppLogin() {
	return (
		<Router>
			<AuthProvider>
				<Nav />
				<main className="wrapper" style={{backgroundImage: "url(./images/bg.png)"}}>
					<div>
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
										<Game />
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
