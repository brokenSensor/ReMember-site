import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name for this pet.'],
		maxlength: [20, 'Name cannot be more than 60 characters'],
	},
	image: {
		required: [true, 'Please provide an image url for this pet.'],
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
