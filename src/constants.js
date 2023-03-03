export const TABS = {
	HOME: "HOME",
	FAVORITE: "FAVORITE",
	RATED: "RATED",
};

export const CATEGORIES = {
	NOW_PLAYING: { title: "Now Playing", value: "now_playing" },
	POPULAR: { title: "Popular", value: "popular" },
	TOP_RATED: { title: "Top Rated", value: "top_rated" },
	UP_COMING: { title: "Upcoming", value: "upcoming" },
};

export const rateLevel = [...Array(10).keys()].map((i) => i + 1);

export const MEDIA_TYPE = {
	MOVIE: "movie",
	TV: "tv",
};
