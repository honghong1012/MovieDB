import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CATEGORIES } from "../../constants";

const Category = (props) => {
	const options = Object.values(CATEGORIES);
	return (
		<Box sx={{ gridColumn: "3/4" }}>
			<Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel variant="standard">Category</InputLabel>
					<Select
						value={props.currentCategory}
						onChange={(e) => {
							props.onChange(e.target.value);
							// setCategory(e.target.value);
						}}
						label="Category"
					>
						{options.map((option) => {
							return (
								<MenuItem key={option.value} value={option.value}>
									{option.title}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
};

export default Category;
