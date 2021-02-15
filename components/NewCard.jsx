import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import styles from '../styles/Desk.module.css';

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
					Add
				</Button>
				<Button
					variant='danger'
					className={styles.btnDelete}
					onClick={() => {
						setShowForm(false);
					}}
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
