import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 1,
};

export const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
	},
});

export const { increment, decrement, incrementByAmount } = pageSlice.actions;

export default pageSlice.reducer;
