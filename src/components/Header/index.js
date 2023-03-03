import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { useSelector } from "react-redux";

// Component import
import HeaderIcon from "./HeaderIcon";
import Tabs from "./Tabs";
import LoginTab from "./LoginTab";

const Header = () => {
	const currentUser = useSelector((state) => state.user);
	return (
		<Box>
			<AppBar
				sx={{
					backgroundColor: "#3f51b5",
					color: "white",
					position: "static",
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						position: "relative",
					}}
				>
					<HeaderIcon />
					<Tabs />
					{!currentUser.loginStatus && <LoginTab />}
					{currentUser.loginStatus && (
						<Box>{currentUser.userData.username}</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
