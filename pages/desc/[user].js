import { useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row, Button } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';
import Card from '../../components/MemCard';

const Desc = ({ notes }) => {
	const [session, loading] = useSession();
	const router = useRouter();
	const { user } = router.query;
	async function deleteNote(id) {
		const data = notes;
		data.splice(id, 1);
		const response = await fetch(
			'http://localhost:3000/api/desc/' + session.user.name,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ notes: data }),
			}
		);
	}
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

export async function getServerSideProps(context) {
	const { user } = context.query;
	const res = await fetch('http://localhost:3000/api/desc/' + user);
	let { notes } = await res.json().finally(200);
	notes = notes.map(note => {
		return JSON.parse(note);
	});

	return { props: { notes: notes } };
}

export default Desc;
