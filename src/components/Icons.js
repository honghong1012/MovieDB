import { SvgIcon } from "@mui/material";

export const StarIcon = () => {
	return (
		<SvgIcon style={{ color: "rgb(245, 197, 24)" }}>
			<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
		</SvgIcon>
	);
};

export const EmptyHeartIcon = () => {
	return (
		<SvgIcon style={{ color: "grey", cursor: "pointer" }}>
			<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
		</SvgIcon>
	);
};

export const FilledHeartIcon = () => {
	return (
		<SvgIcon style={{ color: "red", cursor: "pointer" }}>
			<path
				fillRule="evenodd"
				d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
			/>
		</SvgIcon>
	);
};
