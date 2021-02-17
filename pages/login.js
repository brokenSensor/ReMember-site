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
								callbackUrl: `https://memory-keeper-app.herokuapp.com/desk`,
							})
						}
					/>
					<GoogleLoginButton
						onClick={() =>
							signIn('google', {
								callbackUrl: `https://memory-keeper-app.herokuapp.com/desk`,
							}) 
						}
					/>
				</Jumbotron>
			</Container>
		</>
	);
}
