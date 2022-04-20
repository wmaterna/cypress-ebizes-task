import React, { ReactElement } from "react";
import { UserContextProvider } from "./UserContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#80cbc4",
			light: "#b2fef7",
			dark: "#4f9a94",
			contrastText: "#000"
		}
	}
})


const AppContextProvider: React.FC<{children: ReactElement}> = ({children}) => (
	<UserContextProvider>
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
	</UserContextProvider>
)


export default AppContextProvider;
