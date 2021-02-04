import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import styles from '../styles/Desc.module.css';
import dbConnect from '../middleware/dbConnect';
import User from '../models/User';

const Desc = ({ users }) => {
	const [session, loading] = useSession();
	const router = useRouter();
	console.log(users);
	return (
		<>
			<Jumbotron className={styles.desc}>
				<Row>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
				</Row>
			</Jumbotron>
		</>
	);
};

export async function getServerSideProps() {
	await dbConnect();

	const result = await User.find({});
	const users = result.map(doc => {
		const user = doc.toObject();
		user._id = user._id.toString();
		user.createdAt = user.createdAt.toString();
		user.updatedAt = user.updatedAt.toString();
		return user;
	});

	return { props: { users: users } };
}

export default Desc;
