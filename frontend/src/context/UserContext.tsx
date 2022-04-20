import { UserContextState } from "../types/context.types";
import React, { ReactElement, useState } from "react";


const getTokenFromStorage = (): string | null => {
	const token = localStorage.getItem('token');
	return token;
	// return JSON.parse(token ?? 'false');
}

export const UserContext = React.createContext<UserContextState>({
	token: getTokenFromStorage(),
	logIn: () => {},
	logOut: () => {}
});

export const UserContextProvider: React.FC<{children: ReactElement}> = ({children}) => {
	const [token, setToken] = useState<string | null>(getTokenFromStorage)

	const logIn = (token: string) => {
		localStorage.setItem("token", token);
		setToken(token);
	}

	const logOut = () => {
		localStorage.removeItem("token");
		setToken(null);
	}


	return (
		<UserContext.Provider
			value={{
				token,
				logOut,
				logIn
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
