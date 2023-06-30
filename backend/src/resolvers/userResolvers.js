const bcrypt = require('bcrypt');
const { User, Rum } = require("../models");

const userResolvers = {
	createUser: async ({ input }) => {
		try {
			const user = new User(input);

			const encryptedPassword = await bcrypt.hash(user.password, 10);
      		user.password = encryptedPassword;

			const savedUser = await user.save();
			return savedUser;
		} catch (error) {
			console.error("Error creating user:", error);
			throw new Error("Failed to create user");
		}
	},

	getUser: async ({ id }) => {
		try {
			const user = await User.findById(id);
			return user;
		} catch (error) {
			console.error("Error fetching user:", error);
			throw new Error("Failed to fetch user");
		}
	},

	getUsers: async () => {
		try {
			const users = await User.find();
			return users;
		} catch (error) {
			console.error("Error fetching users:", error);
			throw new Error("Failed to fetch users");
		}
	},

	getUsersByRole: async ({ role }) => {
		try {
			const users = await User.find({ role });
			return users;
		} catch (error) {
			console.error("Error fetching users by role:", error);
			throw new Error("Failed to fetch users");
		}
	},

	getUsersByRoles: async ({ roles }) => {
		try {
			const users = await User.find({ role: { $in: roles } });
			return users;
		} catch (error) {
			console.error("Error fetching users by roles:", error);
			throw new Error("Failed to fetch users");
		}
	},

	getUsersByRolesWithData: async ({ roles }) => {
		try {
			const users = await User.find({ role: { $in: roles } });
			const userIds = users.map((user) => user._id);

			const rums = await Rum.find({ users: { $in: userIds } });

			const getDoctorsRums = async (user) => {
				if (user.role === "assistant") {
					const doctorIds = user.doctors;
					return await Rum.find({ _id: { $in: doctorIds } });
				}
				return [];
			};

			const getUserData = async (user) => {
				const userData = {
					id: user._id.toString(),
					...user._doc,
					rums: user.rums ? await Rum.find({ _id: { $in: user.rums } }) : [],
					doctors: user.doctors ? await getDoctorsRums(user) : [],
				};

				if (user.doctors && user.doctors.length > 0) {
					userData.doctors = await User.find({ _id: { $in: user.doctors } });

					for (const doctor of userData.doctors) {
						doctor.rums = await Rum.find({ _id: { $in: doctor.rums } });
						doctor.doctors = await getDoctorsRums(doctor);
					}
				}

				return userData;
			};

			const usersWithRums = await Promise.all(users.map((user) => getUserData(user)));

			return usersWithRums;
		} catch (error) {
			console.error("Error fetching users with data:", error);
			throw new Error("Failed to fetch users with data");
		}
	},
	updateDoctorLength: async ({ userId, maxLength }) => {
		try {
			const user = await User.findById(userId);
			if (!user) {
				throw new Error("User not found");
			}

			user.maxLength = maxLength;
			const updatedUser = await user.save();

			return updatedUser;
		} catch (error) {
			console.error("Error updating doctor length:", error);
			throw new Error("Failed to update doctor length");
		}
	},
	updateUser: async ({ input }) => {
		try {
			const { id, ...updates } = input;
			if(update.password){
				const encryptedPassword = await bcrypt.hash(update.password, 10);
	      		update.password = encryptedPassword;

			}
			const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
			if (!updatedUser) {
				throw new Error("User not found");
			}

			return updatedUser;
		} catch (error) {
			console.error("Error updating user:", error);
			throw new Error("Failed to update user");
		}
	},

	deleteUser: async ({ userId }) => {
		try {
			const deletedUser = await User.findByIdAndDelete(userId);
			if (!deletedUser) {
				throw new Error("User not found");
			}

			// Clean up references in other collections if necessary
			await Rum.updateMany({}, { $pull: { users: userId } });
			// Remove the user from the 'users' field in all Rums

			return true;
		} catch (error) {
			console.error("Error deleting user:", error);
			throw new Error("Failed to delete user");
		}
	},

	changeAssistantDoctorsList: async ({ assistantId, doctorId }) => {
		try {
			const assistant = await User.findById(assistantId);
			if (!assistant) {
				throw new Error("Assistant not found");
			}

			if (!assistant.doctors.includes(doctorId)) {
				assistant.doctors.push(doctorId);
			} else {
				assistant.doctors = assistant.doctors.filter((id) => !id.equals(doctorId));
			}

			const updatedAssistant = await assistant.save();
			return updatedAssistant;
		} catch (error) {
			console.error("Error changing assistant doctors list:", error);
			throw new Error("Failed to change assistant doctors list");
		}
	},
};

module.exports = userResolvers;