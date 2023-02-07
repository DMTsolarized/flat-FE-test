import { FCC } from "Types/FCC";
import { AppBar, Box, Toolbar } from "@mui/material";

const Header: FCC = ({children}) => {
    return (
        <>
            <AppBar
                sx={{
                    bgcolor: "background.paper",
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        height: "210px",
                        maxWidth: "1550px",
                        width: "100%",
                        m: "0 auto"
                    }}
                >
                    {children}
                </Box>
            </AppBar>
            <Toolbar
                sx={{
                    height: "210px",
                }}
            />
        </>
    );
};

export default Header;
