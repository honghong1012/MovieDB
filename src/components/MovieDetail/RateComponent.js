import React, { useEffect, useState, useMemo } from "react";
import {
	Box,
	Typography,
	SvgIcon,
	FormControl,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { rateLevel } from "../../constants";
import { postRatedMovie } from "../API";

const RateComponent = (props) => {
    const currentUser = useSelector((state) => state.user);
    const [userRateValue, setUserRateValue] = useState(10);
    const [userRated, setUserRated] = useState(false)

	const handleUserRate = () => {
		if (!currentUser.loginStatus) return;
		postRatedMovie(currentUser.userData.sessionId, props.movieId, userRateValue);
        setUserRated(true)
	};
	return (
		<>
			{(props.isRated || userRated) && (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<SvgIcon style={{ color: "rgb(245, 197, 24)" }}>
						<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
					</SvgIcon>
					<Box sx={{ alignSelf: "center", marginLeft: "8px" }}>
                        {userRated && <>{userRateValue}</>}
						{props.isRated && <>{props.isRated.rating}</>}
					</Box>
				</Box>
			)}
			{(!props.isRated && !userRated) && (
				<Box>
					<Typography variant="body1">Not yet</Typography>
					<Box sx={{ display: "flex" }}>
						<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
							<Select
								value={userRateValue}
								onChange={(e) => {
									setUserRateValue(e.target.value);
								}}
								label="Age"
							>
								{rateLevel.map((level) => {
									return (
										<MenuItem key={level} value={level}>
											{level}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<Button variant="outlined" color="primary" onClick={handleUserRate}>
							RATE IT!
						</Button>
					</Box>
				</Box>
			)}
		</>
	);
};

export default RateComponent;
