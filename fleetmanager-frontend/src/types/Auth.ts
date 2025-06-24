export interface LoginParams {
	email: string,
	password: string
}

export interface RegisterParams {
	firstname: string;
	lastname: string;
	companyName?: string;
	email: string;
	password: string;
}

export interface User {
	email: string;
	firstname?: string;
	lastname?: string;
	companyName?: string;
	// otros campos que devuelva el backend
}

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (params: LoginParams) => Promise<void>;
	register: (params: RegisterParams) => Promise<void>;
	logout: () => Promise<void>;
}