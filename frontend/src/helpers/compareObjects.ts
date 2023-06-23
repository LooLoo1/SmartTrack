import { GridId } from "../components/RoomsDragDrop/types";

interface ObjectItem {
	id: number;
	name: string;
}

interface InitialObj {
	[GridId.GridSelect]?: ObjectItem[];
	[GridId.GridList]?: ObjectItem[];
}

interface ModifiedObj {
	[GridId.GridSelect]?: ObjectItem[];
	[GridId.GridList]?: ObjectItem[];
}

export interface ComparisonResult {
	[GridId.GridSelect]?: number[];
	[GridId.GridList]?: number[];
}

export const compareObjects = (initialObj: InitialObj, modifiedObj: ModifiedObj): ComparisonResult => {
	const result: ComparisonResult = {};

	if (Array.isArray(initialObj[GridId.GridSelect]) && Array.isArray(modifiedObj[GridId.GridSelect])) {
		const addedObjects = modifiedObj[GridId.GridSelect]
			.filter((obj) => !initialObj[GridId.GridSelect]?.some((initialObj) => initialObj.id === obj.id))
			.map((obj) => obj.id);
		if (addedObjects.length > 0) {
			result[GridId.GridSelect] = addedObjects;
		}
	}

	if (Array.isArray(initialObj[GridId.GridList]) && Array.isArray(modifiedObj[GridId.GridList])) {
		const movedObjects = modifiedObj[GridId.GridList]
			.filter((obj, index) => {
				const initialObjAtIndex = initialObj[GridId.GridList]?.[index];
				return (
					!initialObj[GridId.GridList]?.some((initialObj) => initialObj.id === obj.id) &&
					initialObjAtIndex?.id !== obj.id
				);
			})
			.map((obj) => obj.id);
		if (movedObjects.length > 0) {
			result[GridId.GridList] = movedObjects;
		}
	}

	return result;
};
