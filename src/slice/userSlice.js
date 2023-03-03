import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {},
	loginStatus: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.userData = action.payload.userData;
			state.loginStatus = action.payload.loginStatus;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
