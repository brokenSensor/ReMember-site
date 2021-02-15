import React from 'react';

function Footer() {
	const year = new Date().getFullYear();
	return (
		<>
			<div class='footer-padding'></div>
			<div class='footer'>
				<p>{`© ${year} made by Eugeny Hrebtov`}</p>
			</div>
		</>
	);
}

export default Footer;
