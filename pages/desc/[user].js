import { useSession, getSession } from 'next-auth/client';
import { Col, Container, Jumbotron, Row, Button, Form } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';
import MemCard from '../../components/MemCard';
import dbConnect from '../../middleware/dbConnect';
import User from '../../models/User';
import { useState } from 'react';
import NewCard from '../../components/NewCard';

const Desc = ({ notes }) => {
	const [session, loading] = useSession();

	const [showForm, setShowForm] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [notesState, setNotesState] = useState(notes);

	async function deleteNote(id) {
		notesState.splice(id, 1);
		setNotesState([...notesState]);
		await fetch('http://localhost:3000/api/desc/' + session.user.name, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: notesState }),
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
			return [...prV];
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
			return [...prV];
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
		today.setHours(0, 0, 0, 0);
		const reviewDate = new Date(note.curve.review);
		reviewDate.setHours(0, 0, 0, 0);
		if (today >= reviewDate) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<>
			<Container fluid className={styles.desc}>
				<Row className={styles.btnRow}>
					<Col>
						<Button
							onClick={() => {
								setShowForm(!showForm);
							}}
							className={styles.btnAddNote}
						>
							Add Note
						</Button>
					</Col>
					<Col>
						<Button
							onClick={() => {
								setEditMode(!editMode);
							}}
							style={{ backgroundColor: editMode && 'red' }}
							className={styles.btnAllNotes}
						>
							All Notes
						</Button>
					</Col>
				</Row>
				<Row className={styles.memCardRow}>
					{editMode ? (
						<>
							{notesState.map((note, id) => {
								return (
									<Col xs={12} sm={6} md={6} lg={4} xl={3} key={id}>
										<MemCard
											edit={true}
											updateStage={updateStage}
											deleteNote={deleteNote}
											note={note}
											id={id}
										></MemCard>
									</Col>
								);
							})}
						</>
					) : (
						<>
							{notesState.map((note, id) => {
								if (noteFilter(note)) {
									return (
										<Col xs={12} sm={6} md={6} lg={4} xl={3} key={id}>
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
						</>
					)}
					{showForm && (
						<Col xs={12} sm={6} md={6} lg={4} xl={3}>
							<NewCard setShowForm={setShowForm} addNote={addNote}></NewCard>
						</Col>
					)}
				</Row>
			</Container>
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
					review: addDays(new Date(), 0).toJSON(),
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
