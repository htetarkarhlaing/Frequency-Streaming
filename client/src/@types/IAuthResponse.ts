interface Meta {
	success: boolean;
	devMessage: string;
	message: string;
}

interface LoginBody {
	accessToken: string;
	refreshToken: string;
}

export interface ILogin {
	meta: Meta;
	body: LoginBody;
}

interface MeBody {
	id: string;
	email: string;
	status: string;
	profile: Profile;
	channel: [];
}

interface Profile {
	id: string;
	name: string;
	image: null;
	mood: null;
}

export interface IWhoAmI {
	meta: Meta;
	body: MeBody;
}
