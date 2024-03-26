import {Box, Typography} from "@mui/material";

function StartService() {
    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography variant={"h6"} color={"#333"}>
                Start by selecting a service 🙄
            </Typography>
        </Box>
    );
}

export default StartService;