import React from "react";
import Theme from "Components/Theme";
import {  ThemeProvider } from "@mui/material";
import Router from "Components/Router";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Router />
        </ThemeProvider>
    );
};

export default App;
