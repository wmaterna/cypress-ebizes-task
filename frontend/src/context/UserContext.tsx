import { UserContextState } from "../types/context.types";
import React, { ReactElement, useState } from "react";


const getTokenFromStorage = (): string | null => {
	const token = localStorage.getItem('token');
	return token;
	// return JSON.parse(token ?? 'false');
}

const getDoctorInfoStorage = (): boolean | null => {
	const isDoctor = localStorage.getItem('isDoctor');
	return isDoctor ? isDoctor === "True" : null;
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
	const [isDoctor, setIsDoctor] = useState<boolean | null>(getDoctorInfoStorage)

	const logIn = (token: string, isDoctor: string) => {
		localStorage.setItem("token", token);
		localStorage.setItem("isDoctor", isDoctor);
		setToken(token);
		setIsDoctor(isDoctor === "True")
	}

	const logOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isDoctor");
		setToken(null);
		setIsDoctor(null);
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
