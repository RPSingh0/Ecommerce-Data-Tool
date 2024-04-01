import {Box} from "@mui/material";

function FormAndDataContainer({children}) {
    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 4fr",
            columnGap: "2rem",
            width: "100%",
            padding: "2rem",
            overflow: "auto"
        }}>
            {children}
        </Box>
    );
}

export default FormAndDataContainer;