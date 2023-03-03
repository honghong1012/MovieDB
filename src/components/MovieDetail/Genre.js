import { Box, Chip } from "@mui/material";

const Genre = (props) => {
	return (
		<Box sx={{ marginRight: "8px" }}>
			<Chip label={props.genre.name} color="primary" />
		</Box>
	);
};

export default Genre;
