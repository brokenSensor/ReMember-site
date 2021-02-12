import React from 'react';
import { useState } from 'react';
import { Col, Container, Jumbotron, Row, Button, Form } from 'react-bootstrap';
import styles from '../styles/AddNoteForm.module.css';

function AddNoteForm({ addNote, setShowForm }) {
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
		<Container fluid className={styles.back}>
			<Form className={styles.form}>
				<Form.Group>
					<Form.Label>Note question</Form.Label>
					<Form.Control
						type='text'
						placeholder='Note question'
						name='title'
						value={titleField}
						onChange={handleChange}
						autoComplete='off'
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Note answer</Form.Label>
					<Form.Control
						type='text'
						placeholder='Note answer'
						name={'content'}
						value={contentField}
						onChange={handleChange}
						autoComplete='off'
					/>
				</Form.Group>
				<Button
					className={styles.button}
					onClick={() => {
						submit();
					}}
				>
					Add
				</Button>
				<Button
					className={styles.button}
					onClick={() => {
						setShowForm(false);
					}}
				>
					Close
				</Button>
			</Form>
		</Container>
	);
}

export default AddNoteForm;
