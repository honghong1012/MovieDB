import { Box } from "@mui/material";
import Genre from "./Genre";

const Genres = (props) => {
	console.log(props.genres);
	return (
		<Box sx={{ display: "flex", flexWrap:"wrap", alignItems:"center"}}>
			{props.genres &&
				props.genres.map((genre) => {
					return <Genre key={genre.id} genre={genre} />;
				})}
		</Box>
	);
};

export default Genres;
