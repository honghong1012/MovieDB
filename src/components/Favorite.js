import { Box, Typography } from "@mui/material";
import MovieCardList from "./Home/MovieCardList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchFavoriteMoviesByAccount, fetchRatedMoviesByAccount } from "./API";
import { setFavoriteMovie, setRatedMovie } from "../slice/movieSlice";

const Favorite = () => {
	const currentUser = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const favoriteMovieList = useSelector(
		(state) => state.movies.favoriteMovieList
	);
	const ratedMovieList = useSelector((state) => state.movies.ratedMovieList);
	const favoriteMovieMap = useMemo(() => {
		return favoriteMovieList.reduce((acc, favoriteMovie) => {
			acc[favoriteMovie.id] = favoriteMovie;
			return acc;
		}, {});
	}, [favoriteMovieList]);

	const ratedMovieMap = useMemo(() => {
		return ratedMovieList.reduce((acc, ratedMovie) => {
			acc[ratedMovie.id] = ratedMovie;
			return acc;
		}, {});
	}, [ratedMovieList]);

	useEffect(() => {
		if (!currentUser.loginStatus) return;
		fetchFavoriteMoviesByAccount(
			currentUser.userData.sessionId,
			currentUser.userData.accountId
		).then((data) => {
			dispatch(setFavoriteMovie(data.results));
		});

		fetchRatedMoviesByAccount(
			currentUser.userData.sessionId,
			currentUser.userData.accountId
		).then((data) => {
			dispatch(setRatedMovie(data.results));
		});
	}, [currentUser]);

	return (
		<Box padding="40px">
			<Typography variant="h3" align="center">
				Favorite movies
			</Typography>
			{currentUser.loginStatus && (
				<MovieCardList
					movieList={favoriteMovieList}
					favoriteMovieMap={favoriteMovieMap}
					ratedMovieMap={ratedMovieMap}
				/>
			)}
		</Box>
	);
};

export default Favorite;
