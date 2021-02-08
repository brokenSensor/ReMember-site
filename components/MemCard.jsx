import { useState } from 'react';
import { Col, Container, Jumbotron, Row, Button, Card } from 'react-bootstrap';
import styles from '../styles/Desc.module.css';

function MemCard({ note }) {
	const [showAnswer, setShowAnswer] = useState(false);
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>{note.title}</Card.Title>
				{showAnswer && <Card.Text>{note.content}</Card.Text>}
				<Button
					variant='primary'
					onClick={() => {
						setShowAnswer(!showAnswer);
					}}
				>
					Reveal
				</Button>
				<Button variant='danger' className={styles.btnDelete}>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
}

export default MemCard;
