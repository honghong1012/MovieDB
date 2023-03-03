import { Box, Typography } from "@mui/material";

const ProductionCompany = (props) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				marginRight: "16px",
				justifyContent: "space-between",
			}}
		>
			<img
				src={`https://image.tmdb.org/t/p/w500/${props.company.logo_path}`}
				alt={props.company.name}
                style={{objectFit:"cover"}}
                width={"50px"}
                height={"30px"}
			></img>
			<Typography variant="body2">{props.company.name}</Typography>
		</Box>
	);
};

export default ProductionCompany;
