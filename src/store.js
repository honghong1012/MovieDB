import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slice/movieSlice";
import pageReducer from "./slice/pageSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
	reducer: {
		// page: pageReducer,
		user: userReducer,
		movies: movieSlice,
	},
});
