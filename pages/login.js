import { Container, Row, Col, Form, Button, Jumbotron } from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useContext } from 'react';

export default function Login() {
	return (
		<>
			<Jumbotron className='my-auto'>
				<Button onClick={() => signIn('github', { callbackUrl: '/' })}>
					Sign In with GitHub
				</Button>
				<Button onClick={() => signIn('google', { callbackUrl: '/' })}>
					Sign In with Google
				</Button>
			</Jumbotron>
		</>
	);
}
