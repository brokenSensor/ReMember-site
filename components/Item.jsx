import styles from '../styles/Item.module.css';

function Item() {
	return (
		<div className='col-sm-6 col-md-4'>
			<div className={'card ' + styles.item}>
				<img
					src='https://image.pngaaa.com/612/733612-middle.png'
					className='img-fluid card-img-top'
					alt='...'
				/>
				<div className='card-body'>
					<p className='card-text'>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Item;
