import dbConnect from '../../../util/dbConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
	const { method } = req;

	const {
		user: { name },
	} = await getSession({ req });

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				await User.findOne(
					{
						name: name,
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
				await User.updateOne({ name: name }, { notes: req.body.notes }, err => {
					if (err) {
						res.status(err).end();
					} else {
						res.status(200).end();
					}
				}); /* Update notes */
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
