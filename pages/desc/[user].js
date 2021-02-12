import { useSession, getSession } from 'next-auth/client';
import { Col, Container, Jumbotron, Row, Button, Form } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';
import MemCard from '../../components/MemCard';
import dbConnect from '../../middleware/dbConnect';
import User from '../../models/User';
import { useState, useReducer } from 'react';
import AddNoteForm from '../../components/AddNoteForm';

const Desc = ({ notes }) => {
	const [session, loading] = useSession();
	const [showForm, setShowForm] = useState(false);
	const [notesState, setNotesState] = useState(notes);
	console.log(notes);
	const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

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
		noteObj.lastReviewDate = new Date().toJSON();
		noteObj.curve = {
			review: addDays(new Date(), 1).toJSON(),
			adder: 2,
		};
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

	async function updateStage(id) {
		setNotesState(prV => {
			prV[id].lastReviewDate = new Date().toJSON();
			prV[id].curve.review = addDays(new Date(), prV[id].curve.adder).toJSON();
			prV[id].curve.adder += 1;
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

	function noteFilter(note) {
		const today = new Date();
		if (today > note.curve.review) {
			return true;
		} else {
			return false;
		}
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
						if (noteFilter(note)) {
							return (
								<Col xs={12} sm={11} md={6} lg={4} key={id}>
									<MemCard
										updateStage={updateStage}
										deleteNote={deleteNote}
										note={note}
										id={id}
									></MemCard>
								</Col>
							);
						}
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
		const today = new Date();
		notes = [
			{
				title: 'Your First Note',
				content: 'Your First Answer',
				lastReviewDate: today.toJSON(),
				curve: {
					review: addDays(new Date(), 1).toJSON(),
					adder: 2,
				},
			},
		];
	}
	return { props: { notes: notes } };
}

export default Desc;

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
