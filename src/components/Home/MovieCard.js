import {
	Box,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Card,
	Link,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovie, deleteFavoriteMovie } from "../../slice/movieSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { EmptyHeartIcon, FilledHeartIcon, StarIcon } from "../Icons";
import { useEffect, useState, useMemo } from "react";

const MovieCard = (props) => {
	const currentUser = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [imageUrl, setImageUrl] = useState();

	const handleFavoriteOnClick = (movie) => {
		console.log(movie);
		if (!currentUser.loginStatus) {
			navigate("/login");
		} else {
			if (props.isFavorite) {
				dispatch(deleteFavoriteMovie(movie));
			} else {
				dispatch(addFavoriteMovie(movie));
				props.markFavoriteHandler(movie);
			}
		}
	};

	// useEffect(() => {
	// 	// Check if the cache is available
	// 	if ('caches' in window) {
	// 	  // Open the cache
		  
	// 	  caches.open('my-image-cache').then(function(cache) {
	// 		// Check if the image is cached
		
	// 		cache.match(fullUrl).then(function(response) {
	// 			console.log(response)
	// 		  if (response) {
	// 			// Set the image source to the cached response URL
	// 			console.log("why")
	// 			setImageUrl(response.url);
				
	// 		  } else {
	// 			console.log("why")
	// 			setImageUrl(`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`)
	// 		  }
	// 		});
	// 	  });
	// 	}
	//   }, []);

	// const getUrl = useMemo(() => {
	// 	return `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`;
	// }, [props.movie.poster_path])
	// useEffect(() => {
	// 	if (localStorage.getItem(`${props.movie.poster_path}`)) {
	// 		const cachedImage = localStorage.getItem(`${props.movie.poster_path}`);
	// 		setImageUrl(cachedImage);
	// 		console.log("cached!");
	// 	} else {
	// 		fetch(`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`)
	// 		.then(res => res.blob())
	// 		.then(data => {
	// 			localStorage.setItem(`${props.movie.poster_path}`, data);
	// 			setImageUrl(data);
	// 		})
	// 			// .then((res) => res.blob())
	// 			// .then((blob) => {
	// 			// 	localStorage.setItem(`${props.movie.poster_path}`, blob);
	// 			// 	setImageUrl(blob)
	// 				// const reader = new FileReader();
	// 				// reader.readAsDataURL(blob);
	// 				// reader.onload = () => {
	// 					// const dataUrl = reader.result;
	// 					// localStorage.setItem(`${props.movie.poster_path}`, dataUrl);
	// 					// setImageUrl(dataUrl);
	// 				// };
	// 			// });
	// 	}
	// },);

	return (
		<Card>
			<Link
				to={`/movies/${props.movie.id}`}
				component={RouterLink}
				underline="none"
				color="inherit"
			>
				<CardActionArea>
					<CardMedia
						component="img"
						src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
						alt="poster"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5">
							{props.movie.title}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<CardActions sx={{ justifyContent: "space-between" }}>
				<Box sx={{ display: "flex" }}>
					<StarIcon />
					<Box sx={{ alignSelf: "center" }}>
						{props.isRated && <>{props.isRated.rating} \ </>}
						{props.movie.vote_average}
					</Box>
				</Box>
				<Box
					onClick={() => {
						handleFavoriteOnClick(props.movie);
					}}
				>
					{props.isFavorite && <FilledHeartIcon />}
					{!props.isFavorite && <EmptyHeartIcon />}
				</Box>
			</CardActions>
		</Card>
	);
};

export default MovieCard;
