import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { clientApi } from "./API";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const cachedUserData = localStorage.getItem("user");
		if (cachedUserData) {
			dispatch(
				setUser({ userData: JSON.parse(cachedUserData), loginStatus: true })
			);
			navigate("/");
		} else {
			return;
		}
	}, []);

	const login = async (username, password, setLoginError) => {
		try {
			setLoginError(false);
			setLoading(true);
			console.log("loading");

			// Get request_token
			const {
				data: { request_token },
			} = await clientApi.get(`authentication/token/new`);

			// Validate username and password
			await clientApi.post(`/authentication/token/validate_with_login`, {
				username,
				password,
				request_token,
			});

			// If username and password match, get session_id
			const {
				data: { session_id },
			} = await clientApi.post(`/authentication/session/new`, {
				request_token,
			});

			// Manage axios to request account details, login succeed!
			clientApi.defaults.params = { ...clientApi.defaults.params, session_id };
			const { data } = await clientApi.get("/account");
			const userData = {
				username,
				accountId: data.id,
				sessionId: session_id,
				requestToken: request_token,
			};
			localStorage.setItem("user", JSON.stringify(userData));
			dispatch(setUser({ userData, loginStatus: true }));
			setLoading(false);
			navigate("/");
		} catch (e) {
			setLoginError(true);
			setLoading(false);
			throw e;
		}
	};

	return (
		<Box sx={{ paddingTop: "40px", width: "500px", margin: "auto" }}>
			<Box component="form">
				<Typography variant="h3" sx={{ textAlign: "center" }}>
					Login
				</Typography>
				{loginError && (
					<Typography sx={{ color: "red", textAlign: "center" }}>
						Login Failed!
					</Typography>
				)}
				<Box>
					<TextField
						id="standard-username-input"
						label="Username"
						type="username"
						variant="standard"
						fullWidth
						sx={{ marginBottom: "24px" }}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						onFocus={() => {
							setLoginError(false);
						}}
					/>
				</Box>
				<Box>
					<TextField
						id="standard-password-input"
						label="Password"
						type="password"
						variant="standard"
						fullWidth
						sx={{ marginBottom: "24px" }}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onFocus={() => {
							setLoginError(false);
						}}
					/>
				</Box>
				{loading && <Loading />}
				{!loading && (
					<Button
						fullWidth
						variant="contained"
						sx={{ backgroundColor: "#3f51b5" }}
						onClick={() => {
							login(username, password, setLoginError);
						}}
					>
						Submit
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default Login;
