import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Item from '../components/Item';
import { Container, Row } from 'react-bootstrap';
import SVGTitle from '../components/SVGTitle';

export default function Home() {
	return (
		<>
			<Container as='section' fluid className={`row ${styles.titleSection}`}>
				<div className={`col-sm-6 ${styles.titleText}`}>
					<h1 className={styles.titleHeading}>Remember better</h1>
					<p className={styles.titleParagraph}>Study smarter, not harder</p>
				</div>
				<div className={`col-sm-6 ${styles.titleImageSec}`}>
					<SVGTitle />
				</div>
			</Container>
			<section className={styles.benifitsSection}>
				<h2 className={styles.sectionTitle}>Benifits</h2>
				<Row className={styles.benRow}>
					<Item />
					<Item />
					<Item />
					<Item />
					<Item />
					<Item />
				</Row>
			</section>
			{/* <section>
				<h2 className={styles.sectionTitle}>Enroll Now</h2>
			</section> */}
		</>
	);
}

{
	/* <img
	className={`img-fluid ${styles.titleImg}`}
	src='https://purepng.com/public/uploads/large/human-brain-ouq.png'
	alt=''
></img>; */
}
