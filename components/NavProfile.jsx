import { Nav, Image, NavDropdown, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import styles from '../styles/Navbar.module.css';

function NavProfile() {
	const [session, loading] = useSession();
	const router = useRouter();
	return (
		<>
			{' '}
			{loading ? (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			) : !session ? (
				<Nav.Link onClick={() => router.push('/login')}>Login</Nav.Link>
			) : (
				<>
					<Nav.Link onClick={() => router.push('/desk/' + session.user.name)}>
						My Desk
					</Nav.Link>
					<Image
						width={25}
						height={25}
						src={session.user.image}
						roundedCircle
						className={styles.profileImage}
					></Image>
					<NavDropdown title={session.user.name} id='basic-nav-dropdown'>
						<NavDropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
							Sign out
						</NavDropdown.Item>
					</NavDropdown>
				</>
			)}{' '}
		</>
	);
}

export default NavProfile;
