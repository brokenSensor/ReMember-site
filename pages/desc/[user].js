import { useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row, Button, Form } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';
import Card from '../../components/MemCard';
import dbConnect from '../../middleware/dbConnect';
import User from '../../models/User';
import { useState } from 'react';
import AddNoteForm from '../../components/AddNoteForm';

const Desc = ({ notes }) => {
	const [showForm, setShowForm] = useState(false);
	const [session, loading] = useSession();
	const router = useRouter();
	const { user } = router.query;
	async function deleteNote(id) {
		notes.splice(id, 1);
		const response = await fetch(
			'http://localhost:3000/api/desc/' + session.user.name,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ notes: notes }),
			}
		);
	}
	async function addNote(noteObj) {
		notes.push(noteObj);
		await fetch('http://localhost:3000/api/desc/' + session.user.name, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: notes }),
		});
	}
	return (
		<>
			{showForm && (
				<AddNoteForm setShowForm={setShowForm} addNote={addNote}></AddNoteForm>
			)}
			<Jumbotron className={styles.desc}>
				<Button
					onClick={() => {
						setShowForm(!showForm);
					}}
				>
					Add Note
				</Button>
				<Row>
					{notes.map((note, id) => {
						return (
							<Col>
								<Card deleteNote={deleteNote} note={note} id={id}></Card>
							</Col>
						);
					})}
				</Row>

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
	let { notes } = userNotes;
	if (notes === null || notes.length === 0) {
		notes = [{ title: 'Your First Note', content: 'Your First Answer' }];
	}
	return { props: { notes: notes } };
}

export default Desc;
