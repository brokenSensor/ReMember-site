import { useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row, Button, Form } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';
import MemCard from '../../components/MemCard';
import dbConnect from '../../middleware/dbConnect';
import User from '../../models/User';
import { useState } from 'react';
import AddNoteForm from '../../components/AddNoteForm';

const Desc = ({ notes }) => {
	const [showForm, setShowForm] = useState(false);
	const [notesState, setNotesState] = useState(notes);
	const [session, loading] = useSession();
	const router = useRouter();
	const { user } = router.query;
	async function deleteNote(id) {
		const newN = [...notesState];
		newN.splice(id, 1);
		setNotesState(newN);
		await fetch('http://localhost:3000/api/desc/' + session.user.name, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: newN }),
		});
	}
	async function addNote(noteObj) {
		setNotesState(prV => {
			prV.push(noteObj);
			return prV;
		});
		await fetch('http://localhost:3000/api/desc/' + session.user.name, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: notesState }),
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
					{notesState.map((note, id) => {
						return (
							<Col xs={12} sm={11} md={6} lg={4} key={id}>
								<MemCard deleteNote={deleteNote} note={note} id={id}></MemCard>
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
