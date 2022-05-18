
export interface UserContextState {
	token: string | null;
	isDoctor: string | null;
	logIn: (token: string, isDoctor: string) => void;
	logOut: () => void;
}
