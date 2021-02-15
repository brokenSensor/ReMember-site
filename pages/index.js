import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Item from '../components/Item';
import { Container, Row } from 'react-bootstrap';
import SVGTitle from '../components/SVGTitle';
import Footer from '../components/Footer';

export default function Home() {
	return (
		<>
			<Container as='section' fluid className={`row ${styles.titleSection}`}>
				<div className={`col-sm-6 ${styles.titleText}`}>
					<h1 className={styles.titleHeading}>Memory Keeper</h1>
					<p className={styles.titleParagraph}>Learn once, remember forever</p>
				</div>
				<div className={`col-sm-6 ${styles.titleImageSec}`}>
					<SVGTitle />
				</div>
			</Container>
			<section className={styles.benifitsSection}>
				<h2 className={styles.sectionTitle}>Introduction</h2>
				<Row className={styles.benRow}>
					<Item
						url={'/images/1.png'}
						text={
							"With my simple app, you don't have to worry about forgetting something important!"
						}
					/>
					<Item
						url={'/images/2.png'}
						text={
							'Just login with your preferred method and get access to your personal desk!'
						}
					/>
					<Item
						url={'/images/3.png'}
						text={
							'Start creating your first memory note by pressing Add Note button.'
						}
					/>
					<Item
						url={'/images/4.png'}
						text={
							'Enter the phrase, by what you want to memorize, and then add a brief description of that.'
						}
					/>
					<Item
						url={'/images/5.png'}
						text={
							"And that's it! Note will appear on your desk whenever your brain will need to refresh your memory, which will eventually lead to remembering that thing forever!"
						}
					/>
					<Item
						href={'https://en.wikipedia.org/wiki/Forgetting_curve'}
						text={`Learn more about Forgetting Curve here!`}
						url={'/images/6.png'}
					/>
				</Row>
			</section>
			<Footer />
		</>
	);
}
