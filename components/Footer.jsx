import React from 'react';

function Footer() {
	const year = new Date().getFullYear();
	return (
		<>
			<div className='footer-padding'></div>
			<div className='footer'>
				<p>{`© ${year} made by Eugeny Hrebtov`}</p>
			</div>
		</>
	);
}

export default Footer;
