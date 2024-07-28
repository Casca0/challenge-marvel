import './Hero.css';

export default function Heroes({ hero }) {
	return (
		<div
			className='heroCard'
			key={hero.id}>
			<img
				src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
				alt={hero.name}
			/>
			<div className='heroName'>
				<h4>{hero.name}</h4>
			</div>
		</div>
	);
}
