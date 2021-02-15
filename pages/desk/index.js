import { useSession, getSession } from 'next-auth/client';
import { Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import styles from '../../styles/Desk.module.css';
import MemCard from '../../components/MemCard';
import dbConnect from '../../util/dbConnect';
import User from '../../models/User';
import { useState } from 'react';
import NewCard from '../../components/NewCard';

const Desk = ({ notes }) => {
	const [session, loading] = useSession();

	const [showForm, setShowForm] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [notesState, setNotesState] = useState(notes);

	async function deleteNote(id) {
		notesState.splice(id, 1);
		setNotesState([...notesState]);
		await fetch(`${process.env.NEXTAUTH_URL}api/desk`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: notesState }),
		});
	}

	async function addNote(noteObj) {
		// Adding notes to DB
		noteObj.lastReviewDate = new Date().toJSON();
		noteObj.curve = {
			review: addDays(new Date(), 1).toJSON(),
			adder: 2,
		};
		setNotesState(prV => {
			prV.push(noteObj);
			return [...prV];
		});
		await fetch(`${process.env.NEXTAUTH_URL}api/desk`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: notesState }),
		});
	}

	async function updateNotes(id) {
		// Updeting notes after review
		setNotesState(prV => {
			prV[id].lastReviewDate = new Date().toJSON();
			prV[id].curve.review = addDays(new Date(), prV[id].curve.adder).toJSON();
			if (prV[id].curve.adder >= 7) {
				prV[id].curve.adder = prV[id].curve.adder * 2;
			} else {
				prV[id].curve.adder += 1;
			}
			console.log(prV[id].curve.adder);

			return [...prV];
		});

		await fetch(`${process.env.NEXTAUTH_URL}api/desk`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ notes: notesState }),
		});
	}

	function noteFilter(note) {
		// Filters out notes that not yet ready for review
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
			{loading ? (
				<Container fluid className={`${styles.spinnerContainer}`}>
					<Spinner animation='border' role='status'>
						<span className='sr-only'>Loading...</span>
					</Spinner>
				</Container>
			) : (
				<Container fluid className={styles.desk}>
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
												allInfo={true}
												updateNotes={updateNotes}
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
													updateNotes={updateNotes}
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
			)}
		</>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession(context);

	await dbConnect();

	const userNotes = await User.findOne(
		{
			name: session.user.name,
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

export default Desk;

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}
