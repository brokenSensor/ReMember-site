import { useState } from 'react';
import { Col, Container, Jumbotron, Row, Button, Card } from 'react-bootstrap';
import styles from '../styles/Desc.module.css';

function MemCard({ note, deleteNote, id }) {
	const [showAnswer, setShowAnswer] = useState(false);
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>{note.title}</Card.Title>
				{showAnswer && <Card.Text>{note.content}</Card.Text>}
				{showAnswer ? (
					<Button
						variant='warning'
						onClick={() => {
							setShowAnswer(!showAnswer);
						}}
					>
						Done
					</Button>
				) : (
					<Button
						variant='primary'
						onClick={() => {
							setShowAnswer(!showAnswer);
						}}
					>
						Reveal
					</Button>
				)}
				<Button
					onClick={() => {
						deleteNote(id);
					}}
					variant='danger'
					className={styles.btnDelete}
				>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
}

export default MemCard;
