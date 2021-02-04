import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import styles from '../styles/Desc.module.css';

const Desc = () => {
	const [session, loading] = useSession();
	const router = useRouter();
	// useEffect(() => {
	// 	if (!loading && !session) {
	// 		router.push('/login');
	// 	}
	// }, [loading]);
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

export default Desc;
