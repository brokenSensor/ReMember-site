import { useState } from 'react';
import { Col, Container, Jumbotron, Row, Button, Card } from 'react-bootstrap';
import styles from '../styles/Desc.module.css';

function MemCard({ addNote, setShowForm }) {
	const [titleField, setTitleField] = useState('');
	const [contentField, setContentField] = useState('');
	function handleChange(event) {
		switch (event.target.name) {
			case 'title':
				setTitleField(event.target.value);
				break;
			case 'content':
				setContentField(event.target.value);
				break;

			default:
				break;
		}
	}
	function submit() {
		addNote({ title: titleField, content: contentField });
		setShowForm(false);
	}
	return (
		<Card as='form' className={styles.memCard}>
			<Card.Body>
				<Card.Title
					as='input'
					type='text'
					placeholder='Note question'
					name='title'
					value={titleField}
					onChange={handleChange}
					autoComplete='off'
					className={`${styles.input}`}
				></Card.Title>
				<Card.Text
					as='textarea'
					rows='4'
					autoFocus
					placeholder='Note text'
					name={'content'}
					value={contentField}
					onChange={handleChange}
					autoComplete='off'
					className={`${styles.input}`}
				></Card.Text>
				<br />
				<br />
				<Button
					className={styles.btnRevDon}
					variant='warning'
					onClick={() => {
						submit();
					}}
				>
					Done
				</Button>
				<Button
					variant='danger'
					className={styles.btnDelete}
					onClick={() => {
						setShowForm(false);
					}}
				>
					Delete
				</Button>
			</Card.Body>
		</Card>
	);
}

export default MemCard;
