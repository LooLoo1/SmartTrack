export enum GridId {
	GridSelect = "grid-select",
	GridList = "grid-list",
}

export type DndObject = { id: string; name: string; users: string[] }

export type SortedDnd = Record<GridId | string, DndObject[]>