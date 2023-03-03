import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
	fetchMovieDetailById,
	fetchRatedMoviesByAccount,
	fetchFavoriteMoviesByAccount,
} from "../API";
import Genres from "./Genres";
import Loading from "../Loading";
import ProductionCompanies from "./ProductionCompanies";
import { useSelector, useDispatch } from "react-redux";
import { setRatedMovie, setFavoriteMovie } from "../../slice/movieSlice";
import RateComponent from "./RateComponent";
import { StarIcon } from "../Icons";

const MovieDetail = () => {
	const params = useParams();
	const [movieDetail, setMovieDetail] = useState(null);
	const [loading, setLoading] = useState(false);

	const movies = useSelector((state) => state.movies);
	const currentUser = useSelector((state) => state.user);
	const ratedMovieList = movies.ratedMovieList;
	const ratedMovieMap = useMemo(() => {
		return ratedMovieList.reduce((acc, ratedMovie) => {
			acc[ratedMovie.id] = ratedMovie;
			return acc;
		}, {});
	}, [ratedMovieList]);

	const isRated = ratedMovieMap[params.movieId];
	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		fetchMovieDetailById(params.movieId).then((data) => {
			setMovieDetail(data);
			setLoading(false);
		});

		if (!currentUser.loginStatus) return;
		setLoading(true);
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
			setLoading(false);
		});
	}, [currentUser]);

	return (
		<Box
			sx={{
				display: "flex",
				marginX: "128px",
				padding: "40px",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{loading && <Loading />}
			{!loading && movieDetail && (
				<Box sx={{ display: "flex" }}>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
						alt={movieDetail.original_title}
						style={{ flexBasis: "50%", width: "400px" }}
					></img>
					<Box sx={{ marginLeft: "32px" }}>
						<Typography variant="h3">{movieDetail.original_title}</Typography>
						<Box sx={{ marginY: "8px" }}>
							<Typography variant="h6" gutterBottom>
								Release date:
							</Typography>
							<Typography variant="body1">
								{movieDetail.release_date}
							</Typography>
						</Box>
						<Box sx={{ marginY: "8px" }}>
							<Typography variant="h6" gutterBottom>
								Overview:
							</Typography>
							<Typography variant="body1">{movieDetail.overview}</Typography>
						</Box>
						<Box sx={{ marginY: "8px" }}>
							<Typography variant="h6" gutterBottom>
								Genres:
							</Typography>
							<Genres genres={movieDetail.genres} />
						</Box>
						<Box sx={{ marginY: "8px" }}>
							<Typography variant="h6" gutterBottom>
								Average Rating:
							</Typography>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<StarIcon />
								<Box sx={{ alignSelf: "center", marginLeft: "8px" }}>
									{movieDetail.vote_average}
								</Box>
							</Box>
						</Box>
						<Box sx={{ marginY: "8px" }}>
							<Typography variant="h6" gutterBottom>
								Your Rating:
							</Typography>
							<RateComponent isRated={isRated} movieId={params.movieId} />
						</Box>
						<Box sx={{ marginY: "8px" }}>
							<Typography variant="h6" gutterBottom>
								Production Companies:
							</Typography>
							<ProductionCompanies
								companies={movieDetail.production_companies}
							/>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default MovieDetail;
