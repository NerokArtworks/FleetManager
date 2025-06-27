import type { User } from "./User";

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

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (params: LoginParams) => Promise<void>;
	register: (params: RegisterParams) => Promise<void>;
	logout: () => Promise<void>;
}