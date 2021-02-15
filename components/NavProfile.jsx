import {
	Navbar,
	Nav,
	Form,
	FormControl,
	Button,
	Image,
	NavDropdown,
	Spinner,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
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
					<Nav.Link onClick={() => router.push('/desc/' + session.user.name)}>
						My Desc
					</Nav.Link>
					<Image
						width={25}
						height={25}
						src={session.user.image}
						roundedCircle
						className={styles.profileImage}
					></Image>
					<NavDropdown title={session.user.name} id='basic-nav-dropdown'>
						{/* <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
						<NavDropdown.Divider /> */}
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
