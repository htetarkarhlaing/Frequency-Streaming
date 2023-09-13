export const plainJsonHeader = () => {
	return {
		"Content-Type": "application/json; charset=UTF-8",
		Accept: "application/json",
	};
};

export const authJsonHeader = (token: string) => {
	return {
		"Content-Type": "Application/json",
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};
};

export const authFileHeader = (token: string) => {
	return {
		"Content-Type": "multipart/form-data",
		Accept: "application/json",
		Authorization: `Bearer ${token}`,
	};
};
