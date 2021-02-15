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
							res.status(400).json({ success: false, error: err });
						} else if (result) {
							res.status(200).json({ success: true, data: result });
						} else {
							res.status(400).json({ success: false });
						}
					}
				);
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'PUT':
			try {
				await User.updateOne(
					{ name: username },
					{ notes: req.body.notes },
					err => {
						if (err) {
							res.status(err).end();
						} else {
							res.status(200).end();
						}
					}
				); /* Update notes */
			} catch (err) {
				res.status(err).end();
			}
			break;
		default:
			res.status(405);
			res.end();
			break;
	}
}
