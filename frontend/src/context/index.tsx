import React, { ReactElement } from "react";
import { UserContextProvider } from "./UserContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {SnackbarProvider} from "notistack";


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
		<SnackbarProvider maxSnack={3} autoHideDuration={1500}>
			<LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale("pl")}>
				<ThemeProvider theme={theme}>
					{children}
				</ThemeProvider>
			</LocalizationProvider>
		</SnackbarProvider>
	</UserContextProvider>
)


export default AppContextProvider;
