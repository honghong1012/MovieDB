import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Tabs = () => {
	return (
		<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
			<Box sx={{ marginRight: "40px" }}>
				<Typography variant="h5">
					<Link to="/" component={RouterLink} underline="none" color="inherit">
						HOME
					</Link>
				</Typography>
			</Box>
			<Box sx={{ marginRight: "40px" }}>
				<Typography variant="h5">
					<Link
						to="/favorite"
						component={RouterLink}
						underline="none"
						color="inherit"
					>
						FAVORITE
					</Link>
				</Typography>
			</Box>
			<Typography variant="h5">
				<Link
					to="/rated"
					component={RouterLink}
					underline="none"
					color="inherit"
				>
					RATED
				</Link>
			</Typography>
		</Box>
	);
};

export default Tabs;
