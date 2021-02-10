import { useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row, Button } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';
import Card from '../../components/MemCard';
import dbConnect from '../../middleware/dbConnect';
import User from '../../models/User';

const Desc = ({ notes }) => {
	const [session, loading] = useSession();
	const router = useRouter();
	const { user } = router.query;
	return (
		<>
			<Jumbotron className={styles.desc}>
				<Button>Add Note</Button>
				{notes.map((note, id) => {
					return <Card deleteNote={deleteNote} note={note} id={id}></Card>;
				})}
				{/* <Row>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
				</Row> */}
			</Jumbotron>
		</>
	);
};

export async function getServerSideProps({ params }) {
	await dbConnect();

	const userNotes = await User.findOne(
		{
			name: params.user,
		},
		['notes']
	);
	const { notes } = userNotes;
	return { props: { notes: notes } };
}

export default Desc;
