import { Box } from "@mui/material"
import ProductionCompany from "./ProductionCompany"

const ProductionCompanies = (props) => {
    return (
        <Box sx={{display:"flex"}}>
            {props.companies && props.companies.map((company)=>{
                return <ProductionCompany key={company.id} company={company}/>
            })}
        </Box>
    )
}

export default ProductionCompanies