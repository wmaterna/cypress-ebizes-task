import { UserContextState } from "../types/context.types";
import React, { ReactElement, useState } from "react";


const getTokenFromStorage = (): string | null => {
	const token = localStorage.getItem('token');
	return token;
	// return JSON.parse(token ?? 'false');
}

const getDoctorInfoStorage = (): string | null => {
	const isDoctor = localStorage.getItem('isDoctor');
	return isDoctor;
	// return JSON.parse(token ?? 'false');
}

export const UserContext = React.createContext<UserContextState>({
	token: getTokenFromStorage(),
	isDoctor: getDoctorInfoStorage(),
	logIn: () => {},
	logOut: () => {}
});

export const UserContextProvider: React.FC<{children: ReactElement}> = ({children}) => {
	const [token, setToken] = useState<string | null>(getTokenFromStorage)
	const [isDoctor, setDoctorIndo] = useState<string | null>(getDoctorInfoStorage)

	const logIn = (token: string, isDoctor: string) => {
		localStorage.setItem("token", token);
		localStorage.setItem("isDoctor", isDoctor);
		setToken(token);
	}

	const logOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isDoctor");
		setToken(null);
	}


	return (
		<UserContext.Provider
			value={{
				token,
				isDoctor,
				logOut,
				logIn
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
