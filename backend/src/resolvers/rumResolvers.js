const { User, Rum } = require("../models");

const rumResolvers = {
	getRum: async ({ id }) => {
		try {
			const rum = await Rum.findById(id);
			return rum;
		} catch (error) {
			console.error("Error fetching rum:", error);
			throw new Error("Failed to fetch rum");
		}
	},

	getRums: async () => {
		try {
			const rums = await Rum.find();
			return rums;
		} catch (error) {
			console.error("Error fetching rums:", error);
			throw new Error("Failed to fetch rums");
		}
	},

	getRumsWithData: async () => {
		try {
			const rums = await Rum.find();

			const userIds = rums.flatMap((rum) => rum.users);
			const users = await User.find({ _id: { $in: userIds } });

			const getUserById = (id) => users.find((user) => user._id.equals(id));

			const rumsWithData = rums.map((rum) => {
				const rumData = {
					...rum._doc,
					id: rum._id.toString(),
				};
				if (rumData.users) {
					rumData.users = rumData.users.map((userId) => getUserById(userId));
				}
				return rumData;
			});

			return rumsWithData;
		} catch (error) {
			console.error("Error fetching rums with data:", error);
			throw new Error("Failed to fetch rums with data");
		}
	},

	getRumsByIds: async ({ ids }) => {
		try {
			const rums = await Rum.find({ _id: { $in: ids } });
			return rums;
		} catch (error) {
			console.error("Error fetching rums by ids:", error);
			throw new Error("Failed to fetch rums");
		}
	},
	createRum: async ({ input }) => {
		try {
			const rum = new Rum(input);
			const savedRum = await rum.save();
			return savedRum;
		} catch (error) {
			console.error("Error creating rum:", error);
			throw new Error("Failed to create rum");
		}
	},

	deleteUserFromRum: async ({ rumId, userId }) => {
		try {
			const rum = await Rum.findById(rumId);
			const user = await User.findById(userId);
			if (!rum) {
				throw new Error("Rum not found");
			}
			if (!user) {
				throw new Error("User not found");
			}

			rum.users = rum.users.filter((id) => !id.equals(userId));
			user.rums = user.rums.filter((id) => !id.equals(rumId));

			await rum.save();
			await user.save();

			return rum;
		} catch (error) {
			console.error("Error deleting user from rum:", error);
			throw new Error("Failed to delete user from rum");
		}
	},

	addUserInRum: async ({ rumId, userId }) => {
		try {
			const rum = await Rum.findById(rumId);
			const user = await User.findById(userId);
			if (!rum) {
				throw new Error("Rum not found");
			}
			if (!user) {
				throw new Error("User not found");
			}

			if (!rum.users.includes(userId)) {
				rum.users.push(userId);
			}
			await rum.save();

			if (!user.rums.includes(rumId)) {
				user.rums.push(rumId);
			}
			await user.save();

			return rum;
		} catch (error) {
			console.error("Error adding user to rum:", error);
			throw new Error("Failed to add user to rum");
		}
	},

	resetDoctorFromRums: async ({ userId }) => {
		try {
			const user = await User.findById(userId);
			if (!user) {
				throw new Error("User not found");
			}

			user.rums = [];
			const updatedUser = await user.save();
			await Rum.updateMany({ users: userId }, { $pull: { users: userId } });

			return updatedUser;
		} catch (error) {
			console.error("Error resetting doctor from rums:", error);
			throw new Error("Failed to reset doctor from rums");
		}
	},

	updateRoomName: async ({ rumId, name }) => {
		try {
			const rum = await Rum.findByIdAndUpdate(rumId, { name }, { new: true });
			if (!rum) {
				throw new Error("Rum not found");
			}

			return rum;
		} catch (error) {
			console.error("Error updating room name:", error);
			throw new Error("Failed to update room name");
		}
	},

	updateRumRequire: async ({ rumId, require }) => {
		try {
			const rum = await Rum.findByIdAndUpdate(rumId, { require }, { new: true });
			if (!rum) {
				throw new Error("Rum not found");
			}

			return rum;
		} catch (error) {
			console.error("Error updating rum require:", error);
			throw new Error("Failed to update rum require");
		}
	},

	deleteRum: async ({ rumId }) => {
		try {
			const deletedRum = await Rum.findByIdAndDelete(rumId);
			if (!deletedRum) {
				throw new Error("Rum not found");
			}

			// Clean up references in other collections if necessary
			await User.updateMany({}, { $pull: { rums: rumId } });
			// Remove the rum from the 'rums' field in all Users

			return true;
		} catch (error) {
			console.error("Error deleting rum:", error);
			throw new Error("Failed to delete rum");
		}
	},
};


module.exports = rumResolvers;