import { useState } from 'react';
import { Col, Container, Jumbotron, Row, Button, Card } from 'react-bootstrap';
import styles from '../styles/Desc.module.css';

function MemCard({ note, deleteNote, id, updateStage, edit }) {
	const [showAnswer, setShowAnswer] = useState(false);
	return (
		<Card className={styles.memCard}>
			<Card.Body>
				<Card.Title>{note.title}</Card.Title>
				{edit && (
					<Card.Title>
						{`Review date: ${new Date(note.curve.review).toLocaleDateString()}`}
					</Card.Title>
				)}
				{showAnswer && <Card.Text>{note.content}</Card.Text>}
				{showAnswer ? (
					<Button
						className={styles.btnRevDon}
						variant='warning'
						onClick={() => {
							updateStage(id);
						}}
					>
						Done
					</Button>
				) : (
					<Button
						className={styles.btnRevDon}
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
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-trash-fill'
						viewBox='0 0 16 16'
					>
						<path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
					</svg>
				</Button>
			</Card.Body>
		</Card>
	);
}

export default MemCard;
