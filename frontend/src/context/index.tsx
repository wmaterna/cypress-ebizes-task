import React, { ReactElement } from "react";
import { UserContextProvider } from "./UserContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";


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
		<LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale("pl")}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</LocalizationProvider>
	</UserContextProvider>
)


export default AppContextProvider;
