
export interface UserContextState {
	token: string | null;
	// isDoctor: boolean;  <- future??
	logIn: (token: string) => void;
	logOut: () => void;
}
