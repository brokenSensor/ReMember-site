import { Container, Jumbotron } from 'react-bootstrap';
import { signIn } from 'next-auth/client';
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
						onClick={() =>
							signIn('github', {
								callbackUrl: `${process.env.NEXTAUTH_URL}desk`,
							})
						}
					/>
					<GoogleLoginButton
						onClick={() =>
							signIn('google', {
								callbackUrl: `${process.env.NEXTAUTH_URL}desk`,
							})
						}
					/>
				</Jumbotron>
			</Container>
		</>
	);
}
