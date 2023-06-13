const db = {
	users: [
		{
			id: 1,
			name: "Benedict Cumberbatch",
			phone: "0988372905",
			email: "benedict@gmail.com",
			password: "ufdbodfbnsodubv",
			role: "admin",
		},

		{
			id: 13543233,
			name: "Harry Styles",
			phone: "0988356184",
			email: "harry@gmail.com",
			password: "arrarrarr",
			role: "assistant",
		},
		{
			id: 73454365,
			name: "Ihor Petriv",
			phone: "0988353468",
			email: "ihor@gmail.com",
			password: "ihor191734",
			role: "assistant",

			doctors: [385475646, 543455646],
		},
		{
			id: 64745666,
			name: "Maria Semaniv",
			phone: "0988359473",
			email: "maria@gmail.com",
			password: "maria344ter",
			role: "receptionist",
		},
		{
			id: 385475646,
			name: "Tania Znack",
			phone: "0988353719",
			email: "tania@gmail.com",
			password: "tania3242",
			role: "doctor",

			specialty: "Oculist",
			maxLength: 5,
			rums: [26643435],
		},
		{
			id: 543455646,
			name: "Marta Cumberbatch",
			phone: "0988357618",
			email: "marta@gmail.com",
			password: "marta4632346",
			role: "doctor",

			specialty: "Therapist",
			maxLength: 5,
			rums: [324324335, 26645343],
		},
	],

	rums: [
		{
			id: 26643435,
			name: "Q1",
			users: [13543233, 543455646],
			createdAt: 1685636973,
			require: [
				{ label: "Assistant In", must: false },
				{ label: "Assistant Required", must: true },
				{ label: "Doctor In", must: false },
				{ label: "Doctor Required", must: true },
				{ label: "Patient In", must: false },
				{ label: "Financial In", must: false },
				{ label: "Financial Required", must: true },
				{ label: "Emergency", must: true },
				{ label: "Empty", must: false },
			],
		},
		{
			id: 26645343,
			name: "A3",
			users: [543455646, 543455646],
			createdAt: 1685336973,
			require: [
				{ label: "Assistant In", must: false },
				{ label: "Assistant Required", must: true },
				{ label: "Emergency", must: true },
				{ label: "Empty", must: false },
			],
		},
		{
			id: 324324335,
			name: "B4",
			users: [543455646, 385475646],
			createdAt: 1685936973,
			require: [{ label: "Empty", must: false }],
		},
	],
};

module.exports = db;
