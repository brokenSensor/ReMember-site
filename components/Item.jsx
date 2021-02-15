import styles from '../styles/Item.module.css';
import Image from 'next/image';

function Item({ text, href, url }) {
	return (
		<div className='col-sm-6 col-md-4'>
			<div className={`card ${styles.item}`}>
				{url && (
					<Image
						src={url}
						className='img-fluid card-img-top'
						width={200}
						height={200}
					/>
				)}
				<div className='card-body'>
					{href ? (
						<a href={href}>
							<p className='card-text'>{text}</p>
						</a>
					) : (
						<p className='card-text'>{text}</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Item;
