import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../slice/pageSlice";

const Pagination = (props) => {
	// const currentPage = useSelector((state) => state.page.value);
	// const dispatch = useDispatch();

	return (
		<Box sx={{ gridColumn: "2/3" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Button
					color="primary"
					variant="outlined"
					onClick={props.handlePrevClick}
					// onClick={() => {
					// 	if (currentPage > 1) dispatch(decrement());
					// }}
				>
					PREV
				</Button>
				<Typography variant="body1" sx={{ alignSelf: "center" }}>
					{props.currentPage} / {props.totalPage}
				</Typography>
				<Button
					color="primary"
					variant="outlined"
					onClick={props.handleNextClick}
					// onClick={() => dispatch(increment())}
				>
					NEXT
				</Button>
			</Box>
		</Box>
	);
};

export default Pagination;
