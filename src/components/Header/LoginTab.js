import React from "react";
import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LoginTab = () => {
	return (
		<Typography variant="h6">
			<Link to="/login" component={RouterLink} underline="none" color="inherit">
				Login
			</Link>
		</Typography>
	);
};

export default LoginTab;
