import logo from "../../icon_image.svg";
import React from "react";
import { Box } from "@mui/material";

const HeaderIcon = () => {
	return (
		<Box sx={{ padding: "8px", marginRight: "24px", width: "100px" }}>
			<img src={logo} alt="headerImage" />
		</Box>
	);
};

export default HeaderIcon;
