import { Container, Row, Col, Form, Button, Jumbotron } from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from '../styles/Login.module.css';
import {
	GoogleLoginButton,
	GithubLoginButton,
} from 'react-social-login-buttons';

export default function Login() {
	return (
		<>
			<Container fluid className={`${styles.cont}`}>
				<Jumbotron className={`${styles.jumb}`}>
					<GithubLoginButton
						onClick={() => signIn('github', { callbackUrl: '/' })}
					/>
					<GoogleLoginButton
						onClick={() => signIn('google', { callbackUrl: '/' })}
					/>
				</Jumbotron>
			</Container>
		</>
	);
}
