import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	favoriteMovieList: [],
	ratedMovieList: [],
};

export const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setFavoriteMovie: (state, action) => {
			state.favoriteMovieList = [...action.payload];
		},
		addFavoriteMovie: (state, action) => {
			state.favoriteMovieList = [...state.favoriteMovieList, action.payload];
		},
		deleteFavoriteMovie: (state, action) => {
			state.favoriteMovieList = state.favoriteMovieList.filter(
				(movie) => movie.id !== action.payload.id
			);
		},
		setRatedMovie: (state, action) => {
			state.ratedMovieList = [...action.payload];
		},
	},
});

export const {
	addFavoriteMovie,
	setFavoriteMovie,
	deleteFavoriteMovie,
	setRatedMovie,
	addRatedMovie,
	deleteRatedMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
