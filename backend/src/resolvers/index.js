const { v4: uuidv4 } = require("uuid");
const db = require("../index");
const { authenticateUser } = require("../auth/utils/authentication");

// const copy = (obj) => {
// 	return JSON.parse(JSON.stringify(obj));
// };

const queries = {
	getUser: ({ id }) => {
		return db.users.find((user) => user.id == id);
	},
	getUsers: () => {
		return db.users;
	},

	getUsersByRole: ({ role }) => {
		return db.users.filter((user) => user.role == role);
	},

	getUsersByRoles: ({ roles }) => {
		return db.users.filter((user) => roles.includes(user.role));
	},

	getUsersByRolesWithData: ({ roles }) => {
		const users = db.users.filter((user) => roles.includes(user.role));
		const rumIds = [...new Set(users.flatMap((user) => user.rums).filter((rum) => rum))];

		const rums = db.rums.filter((rum) => rumIds.includes(rum.id));

		const getDoctorsRums = (user) => {
			if (user.role === "assistant") {
				const doctorIds = user.doctors;
				return rums.filter((rum) => doctorIds.includes(rum.id));
			}
			return [];
		};

		const getUserData = (user) => {
			const userData = {
				...user,
				rums: user.rums ? rums.filter((rum) => user.rums.includes(rum.id)) : [],
				doctors: user.doctors ? getDoctorsRums(user) : [],
			};

			if (user.doctors && user.doctors.length > 0) {
				userData.doctors = db.users
					.filter((doctor) => user.doctors.includes(doctor.id))
					.map((doctor) => ({
						...doctor,
						rums: rums.filter((rum) => doctor.rums.includes(rum.id)),
						doctor: getDoctorsRums(doctor),
					}));
			}

			return userData;
		};

		const usersWithRums = users.map((user) => getUserData({ ...user }));

		return usersWithRums;
	},

	getRum: ({ id }) => {
		return db.rums.find((rum) => rum.id == id);
	},
	getRums: () => {
		return db.rums;
	},

	getRumsByIds: ({ ids }) => {
		return db.rums.filter(({ id }) => ids.includes(String(id)));
	},
};

const mutations = {
	login: ({ email, password }) => {
		const result = authenticateUser(email, password);
		return result;
	},

	createUser: ({ input }) => {
		const { name, phone, email, password, role, doctors } = input;

		// const newUserId = uuidv4();
		const newUserId = Date.now();

		const newUser = {
			id: newUserId,
			name,
			phone,
			email,
			password,
			role,
			doctors: doctors || [],
		};

		db.users.push(newUser);

		return newUser;
	},
	createRum: ({ input }) => {
		const { name, users, createdAt, require } = input;

		// Генерування унікального ID для нової кімнати
		const newRumId = uuidv4();

		// Створення нового об'єкта кімнати
		const newRum = {
			id: newRumId,
			name,
			users,
			createdAt,
			require,
		};

		// Додавання нової кімнати до бази даних
		db.rums.push(newRum);

		return newRum;
	},
	deleteUserFromRum: ({ rumId, userId }) => {
		const rumIndex = db.rums.findIndex((rum) => rum.id === rumId);
		if (rumIndex === -1) {
			throw new Error("Rum not found");
		}

		const rum = db.rums[rumIndex];
		const userIndex = rum.users.findIndex((user) => user === userId);
		if (userIndex === -1) {
			throw new Error("User not found in the rum");
		}

		rum.users.splice(userIndex, 1);

		return rum;
	},

	updateDoctorLength: ({ userId, maxLength }) => {
		const userIndex = db.users.findIndex((user) => user.id === Number(userId));
		if (userIndex === -1) {
			throw new Error("User not found");
		}
		const user = db.users[userIndex];
		if (user.role !== "doctor") {
			throw new Error("User not doctor");
		}
		user.maxLength = maxLength;
		return user;
	},

	resetDoctorFromRums: ({ userId }) => {
		const userIndex = db.users.findIndex((user) => user.id === Number(userId));
		if (userIndex === -1) {
			throw new Error("User not found");
		}

		const user = db.users[userIndex];
		if (user.role !== "doctor") {
			throw new Error("User not doctor");
		}

		const rumIdsToRemove = user.rums;
		user.rums = [];

		rumIdsToRemove.forEach((rumId) => {
			const rumIndex = db.rums.findIndex(({ id }) => id == rumId);
			if (rumIndex !== -1) {
				db.rums[rumIndex].users = db.rums[rumIndex].users.filter((id) => id != rumId);
			}
		});

		return user;
	},

	updateRumRequire: ({ rumId, require }) => {
		const rumIndex = db.rums.findIndex((rum) => rum.id === Number(rumId));
		if (rumIndex === -1) {
			throw new Error("Rum not found");
		}
		const rum = db.rums[rumIndex];
		rum.require = require;
		return rum;
	},
	deleteRum: ({ rumId }) => {
		const rumIndex = db.rums.findIndex((rum) => rum.id === rumId);
		if (rumIndex === -1) {
			throw new Error("Rum not found");
		}

		db.rums.splice(rumIndex, 1);

		return true;
	},
	deleteUser: ({ userId }) => {
		const userIndex = db.users.findIndex((user) => user.id === Number(userId));
		if (userIndex === -1) {
			throw new Error("User not found");
		}

		db.users.splice(userIndex, 1);

		return true;
	},

	updateUser: ({ input }) => {
		const { id, name, phone, email, password } = input;
		// const { id, ...args } = input;

		const userIndex = db.users.findIndex((user) => user.id === Number(id));

		if (userIndex === -1) {
			throw new Error("User not found");
		}
		const user = db.users[userIndex];

		user.name = name || user.name;
		user.phone = phone || user.phone;
		user.email = email || user.email;
		user.password = password || user.password;

		// user = {
		// 	...user,
		// 	name,
		// 	phone,
		// 	email,
		// 	password,
		// };

		// // user = {
		// // 	...user,
		// // 	...args
		// // };
		return user;
	},

	changeAssistantDoctorsList: ({ assistantId, doctorId }) => {
		doctorId = Number(doctorId)
		const userIndex = db.users.findIndex((user) => user.id === Number(assistantId));
		const validDoctor = db.users.some((user) => user.id === Number(doctorId));

		if (userIndex === -1) {
			throw new Error("User not found");
		}

		if (!validDoctor) {
			throw new Error("Doctor not found");
		}

		const user = db.users[userIndex];
		user.doctors = user.doctors.includes(doctorId)
			? user.doctors.filter((id) => id !== doctorId)
			: [...user.doctors, doctorId];

		return user;
	},
};

const root = {
	...queries,
	...mutations,
};

module.exports = root;