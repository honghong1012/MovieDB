import axios from "axios";
import { MEDIA_TYPE } from "../constants";

const API_KEY = `2487aa38e5d829bf93dde19304346f17`;

// const media_type = "movie";

export const clientApi = axios.create({
	baseURL: `https://api.themoviedb.org/3`,
	params: { api_key: API_KEY },
});

export const fetchMoviesByCategory = async (currentPage, currentCategory) => {
	const url = `https://api.themoviedb.org/3/movie/${currentCategory}?api_key=${API_KEY}&page=${currentPage}`;

	return await fetch(url)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			throw e;
		});
};

export const fetchFavoriteMoviesByAccount = async (sessionId, accountId) => {
	const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${API_KEY}&language=en-US&session_id=${sessionId}`;

	return await fetch(url)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			throw e;
		});
};

export const fetchRatedMoviesByAccount = async (sessionId, accountId) => {
	const url = `https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`;
	return await fetch(url)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			throw e;
		});
};

export const postFavoriteMovie = (accountId, sessionId, movieId) => {
	axios.post(
		`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
		{
			media_type: MEDIA_TYPE.MOVIE,
			media_id: movieId,
			favorite: true,
		},
		{
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		}
	);
};

export const postRatedMovie = (sessionId, movieId, rateValue) => {
	axios.post(
		`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
		{
			value: rateValue,
		},
		{
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
		}
	);
};

export const fetchMovieDetailById = async (movieId) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
	return await fetch(url)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			throw e;
		});
};
