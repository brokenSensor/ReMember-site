import dbConnect from '../../../middleware/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
	const {
		query: { username },
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
							res.send(result);
						} else {
							res.send('User not found!');
						}
					}
				); /* find user notes in the data in database */
			} catch (err) {
				res.send(err);
			}
			break;
		case 'PUT':
			try {
				await User.updateOne(
					{ name: username },
					{ notes: req.body.notes },
					err => {
						if (err) {
							res.send(err);
						} else {
							res.send('Updated!');
						}
					}
				); /* Update notes */
			} catch (err) {
				res.send(err);
			}
		default:
			res.status(400).json({ success: false });
			break;
	}
}
