export const splitDataByRole = <T extends { role: string }>(data: T[], roles: string[]): { [key: string]: T[] } => {
	const result: { [key: string]: T[] } = {};

	roles.forEach((role) => {
		result[role] = data.filter((item) => item.role === role);
	});

	return result;
};
