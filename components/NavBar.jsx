import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import NavProfile from './NavProfile';
import styles from '../styles/Navbar.module.css';

// {!session && <>   Not signed in <br/>   <button onClick={() => signIn()}>Sign
// in</button> </>} {session && <>   Signed in as {session.user.email} <br/>
// <button onClick={() => signOut()}>Sign out</button> </>}

function NavBar() {
	const router = useRouter();
	return (
		<Navbar
			bg='dark'
			variant='dark'
			expand='lg'
			fixed='top'
			className={`${styles.body}`}
		>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto mr-5'>
					<Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
					<NavProfile />
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
