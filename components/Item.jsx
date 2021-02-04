import styles from '../styles/Item.module.css';

function Item() {
	return (
		<div className='col-sm-4'>
			<div
				class={'card ' + styles.item}
				style={{
					width: '16rem',
				}}
			>
				<img
					src='https://image.pngaaa.com/612/733612-middle.png'
					class='img-fluid card-img-top'
					alt='...'
				/>
				<div class='card-body'>
					<p class='card-text'>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Item;
