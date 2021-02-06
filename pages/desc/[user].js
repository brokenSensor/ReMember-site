import { useSession, getSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import styles from '../../styles/Desc.module.css';

const Desc = ({ notes }) => {
	const [session, loading] = useSession();
	const router = useRouter();
	const { user } = router.query;
	return (
		<>
			<Jumbotron className={styles.desc}>
				<Row>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
					<Col xs={12} sm={11} md={6} lg={4} className={styles.item}>
						<h2>Quastion</h2>
					</Col>
				</Row>
			</Jumbotron>
		</>
	);
};

export async function getServerSideProps() {
	// fetch('http://localhost:3000/api/desc')
	// 	.then(response => {
	// 		return response.json();
	// 	})
	// 	.then(data => {
	// 		console.log(data);
	// 	});
	return { props: { notes: 'res' } };
}

export default Desc;
