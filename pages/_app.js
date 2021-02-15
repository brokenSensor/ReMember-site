import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
import Navbar from '../components/NavBar';
import { Provider } from 'next-auth/client';
import { Container } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Navbar />
			<Container as={'main'} fluid className='main'>
				<Component {...pageProps} />
			</Container>
		</Provider>
	);
}

export default MyApp;
