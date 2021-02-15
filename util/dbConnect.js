import mongoose from 'mongoose';
require('dotenv').config();

async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	return mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
}

export default dbConnect;
