import {Box, Typography} from "@mui/material";
import {convertToTitle} from "../../utilities/utils.js";

function FormParent({currentType, children}) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            overflow: "auto"
        }}
             borderRadius={2}>
            <Typography variant={"h6"} textAlign={"center"}>
                Adding data for {convertToTitle(currentType)}
            </Typography>
            {children}
        </Box>
    );
}

export default FormParent;