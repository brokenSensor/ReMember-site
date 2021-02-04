import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Item from '../components/Item';
// "title-section row"
export default function Home() {
	return (
		<>
			<section className={styles.titleSection + ' row'}>
				<div className={'col-sm-6 ' + styles.titleText}>
					<h1 className={styles.titleHeading + ''}>Remember better</h1>
					<p className={styles.titleParagraph + ''}>
						Study smarter, not harder
					</p>
				</div>
				<div className={'col-sm-6 ' + styles.titleImageSec}>
					<img
						className={'img-fluid ' + styles.titleImg}
						src='https://purepng.com/public/uploads/large/human-brain-ouq.png'
						alt=''
					></img>
				</div>
			</section>
			<section className={styles.benifitsSection}>
				<h2 className={styles.sectionTitle}>Benifits</h2>
				<div className='row'>
					<Item />
					<Item />
					<Item />
					<Item />
					<Item />
					<Item />
				</div>
			</section>
			<section>
				<h2 className={styles.sectionTitle}>Enroll Now</h2>
			</section>
		</>
	);
}
