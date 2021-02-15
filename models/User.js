import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true],
	},
	image: {
		type: String,
	},
	createdAt: {
		type: Date,
	},
	updatedAt: {
		type: Date,
	},
	notes: {
		type: Array,
	},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
