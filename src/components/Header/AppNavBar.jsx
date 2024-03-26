import {AppBar, Toolbar, Typography} from "@mui/material";
import {Construction} from "@mui/icons-material";

function AppNavBar() {

    return (
        <AppBar position={"sticky"} color={"secondary"}>
            <Toolbar>
                <Construction sx={{marginRight: "1rem"}}/>
                <Typography variant={"h6"} component={"div"}>
                    Ecommerce Data Tool
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppNavBar;