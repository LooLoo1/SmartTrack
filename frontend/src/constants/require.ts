import { Requirement } from "../types";

export const REQUIRE: Requirement[] = [
	{ label: "Assistant In", must: false, color: "242, 215, 117" },
	{ label: "Assistant Required", must: true, color: "242, 215, 117" },
	{ label: "Doctor In", must: false, color: "99, 191, 242" },
	{ label: "Doctor Required", must: true, color: "99, 191, 242" },
	{ label: "Patient In", must: false, color: "116, 195, 134" },
	{ label: "Financial In", must: false, color: "147, 157, 255" },
	{ label: "Financial Required", must: true, color: "147, 157, 255" },
	{ label: "Emergency", must: true, color: "252, 102, 102" },
	{ label: "Empty", must: false, color: "221, 221, 221" },
];
