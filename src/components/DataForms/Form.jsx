import {Box} from "@mui/material";

function Form({handleSubmit, onSubmit, children}) {
    return (
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "2rem",
            overflow: "auto",
            padding: "1rem"
        }}>
            {children}
        </Box>
    );
}

export default Form;