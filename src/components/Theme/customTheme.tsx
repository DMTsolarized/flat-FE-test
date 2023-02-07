import { createTheme } from "@mui/material";

const previousText = () => "Previous";
const nextText = () => "Next";

const theme = createTheme({
    palette: {
        primary: {
            light: "#44A0D3",
            main: "#33A3DC",
            dark: "#305ECA",
        },
        error: {
            light: "#F89797",
            main: "#FF0000",
        },
        success: {
            main: "#44D36A",
        },
        secondary: {
            main: "#7E7EF1",
        },
        background: {
            lightGray: "#F3F3F3",
            darkGray: "#C6C6C6",
        },
    },
    typography: {
        fontFamily: ['"Segoe UI"', "sans-serif"].join(","),
    },
    components: {
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: "#FF0000",
                },
                track: {
                    backgroundColor: "#FF0000",
                },
            },
        },
        MuiPaginationItem: {
            defaultProps: {
                // @ts-expect-error Material-UI issue with ts not accepting simple text as button content
                components: { previous: previousText, next: nextText },
            },
        },
    },
});

export default theme;
