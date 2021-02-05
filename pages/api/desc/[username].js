import dbConnect from '../../../middleware/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
	const {
		query: { username, notes },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				await User.findOne(
					{
						name: username,
					},
					['notes'],
					(err, result) => {
						if (err) {
							res.send(err);
						} else if (result) {
							checkAndRes(result);
							res.send(result);
						} else {
							res.send('User not found!');
						}
					}
				); /* find user notes */
			} catch (err) {
				res.send(err);
			}
			break;
		case 'PUT':
			try {
				await User.updateOne({ name: username }, { notes: notes }, err => {
					if (err) {
						res.send(err);
					} else {
						res.send('Updated!');
					}
				}); /* Update notes */
			} catch (err) {
				res.send(err);
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}

function checkAndRes(result) {
	if (result === []) {
		return (result = { title: 'Your first note', content: 'Your first anser' });
	} else {
		return result;
	}
}
