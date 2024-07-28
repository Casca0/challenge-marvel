import './Hero.css';

export default function Heroes({ hero }) {
	return (
		<div className='heroCard'>
			<img
				src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
				alt={hero.name}
			/>
			<div className='heroName'>
				<h3>{hero.name}</h3>
			</div>
		</div>
	);
}
