export const capitalizeFirstLetter = (str: string): string => {
	if (str.length === 0) {
		return str;
	}

	const firstLetter = str[0].toUpperCase();
	const restOfStr = str.slice(1);

	return firstLetter + restOfStr;
};
