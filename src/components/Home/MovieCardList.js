import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieCardList = (props) => {
	return (
		<Box
			sx={{
				display: "grid",
				gap: "32px",
				gridTemplateColumns: "repeat(4,1fr)",
			}}
		>
			{props.movieList.map((movie) => {
				const isFavorite = props.favoriteMovieMap[movie.id];
				const isRated = props.ratedMovieMap[movie.id];
				return (
					<MovieCard
						key={movie.id}
						movie={movie}
						isFavorite={isFavorite}
						isRated={isRated}
						markFavoriteHandler={props.markFavoriteHandler}
					/>
				);
			})}
		</Box>
	);
};

export default MovieCardList;
