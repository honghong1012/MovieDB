import { Box } from "@mui/material";
import Pagination from "./Pagination";
import Category from "./Category";
import { useEffect } from "react";
import {
	fetchMoviesByCategory,
	fetchFavoriteMoviesByAccount,
	postFavoriteMovie,
	fetchRatedMoviesByAccount,
} from "../API";
import MovieCardList from "./MovieCardList";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CATEGORIES } from "../../constants";
import Loading from "../Loading";
import { setFavoriteMovie, setRatedMovie } from "../../slice/movieSlice";

const Home = () => {
	const [movieList, setMovieList] = useState([]);
	const [totalPage, setTotalPage] = useState(999);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentCategory, setCurrentCategory] = useState(
		CATEGORIES.NOW_PLAYING.value
	);
	const [loading, setLoading] = useState(false);
	const currentUser = useSelector((state) => state.user);
	const movies = useSelector((state) => state.movies);
	const dispatch = useDispatch();

	useEffect(() => {
		setLoading(true);
		const cachedMovieList = localStorage.getItem(
			`category_${currentCategory}_page_${currentPage}`
		);
		const cachedTotalPage = localStorage.getItem(
			`category_${currentCategory}_totalPage`
		);
		if (cachedMovieList && cachedTotalPage) {
			setMovieList(JSON.parse(cachedMovieList));
			setTotalPage(JSON.parse(cachedTotalPage));
			setLoading(false);
			console.log("cached!");
		} else {
			fetchMoviesByCategory(currentPage, currentCategory).then((data) => {
				setMovieList(data.results);
				setTotalPage(data.total_pages);

				localStorage.setItem(
					`category_${currentCategory}_page_${currentPage}`,
					JSON.stringify(data.results)
				);
				localStorage.setItem(
					`category_${currentCategory}_totalPage`,
					JSON.stringify(data.total_pages)
				);
				setLoading(false);
			});
		}
	}, [currentUser, currentPage, currentCategory]);

	useEffect(()=>{
		if (!currentUser.loginStatus) return;
		setLoading(true);
		fetchFavoriteMoviesByAccount(
			currentUser.userData.sessionId,
			currentUser.userData.accountId
		).then((data) => {
			dispatch(setFavoriteMovie(data.results));
			console.log(movies.favoriteMovieList);
		});

		fetchRatedMoviesByAccount(
			currentUser.userData.sessionId,
			currentUser.userData.accountId
		).then((data) => {
			dispatch(setRatedMovie(data.results));
			console.log(movies.ratedMovieList);
			setLoading(false);
		});

	}, [currentUser])

	const handleCategoryChange = (category) => {
		setCurrentCategory(category);
		setCurrentPage(1);
	};

	const handlePrevClick = () => {
		if (currentPage === 1) return;
		setCurrentPage(currentPage - 1);
	};

	const handleNextClick = () => {
		if (currentPage === totalPage) return;
		setCurrentPage(currentPage + 1);
	};

	const favoriteMovieMap = useMemo(() => {
		return movies.favoriteMovieList.reduce((acc, favoriteMovie) => {
			acc[favoriteMovie.id] = favoriteMovie;
			return acc;
		}, {});
	}, [movies.favoriteMovieList]);

	const ratedMovieMap = useMemo(() => {
		return movies.ratedMovieList.reduce((acc, ratedMovie) => {
			acc[ratedMovie.id] = ratedMovie;
			return acc;
		}, {});
	}, [movies.ratedMovieList]);

	const markFavoriteHandler = (movie) => {
		postFavoriteMovie(
			currentUser.userData.accountId,
			currentUser.userData.sessionId,
			movie.id
		);
	};

	return (
		<Box sx={{ paddingX: "40px" }}>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					marginY: "24px",
				}}
			>
				<Pagination
					totalPage={totalPage}
					currentPage={currentPage}
					handlePrevClick={handlePrevClick}
					handleNextClick={handleNextClick}
				/>
				<Category
					currentCategory={currentCategory}
					onChange={handleCategoryChange}
				/>
			</Box>
			{loading && <Loading />}
			{!loading && (
				<MovieCardList
					movieList={movieList}
					favoriteMovieMap={favoriteMovieMap}
					ratedMovieMap={ratedMovieMap}
					markFavoriteHandler={markFavoriteHandler}
				/>
			)}
		</Box>
	);
};

export default Home;
