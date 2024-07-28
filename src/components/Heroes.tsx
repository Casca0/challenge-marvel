import { useFavorites } from '../provider';
import './Hero.css';
import Heart from '../assets/AssetsComponents/Heart';

export default function Heroes({ hero }) {
	const { favorites, setFavorites } = useFavorites();

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		id: number
	) => {
		if (
			event.target.checked &&
			favorites.length < 5 &&
			!favorites.find((hero) => hero.id === id)
		) {
			const tempArr = favorites.slice();
			tempArr.push(hero);
			setFavorites(tempArr);
		} else if (favorites.find((hero) => hero.id === id)) {
			const tempArr = favorites.slice();
			const index = tempArr.indexOf((hero) => hero.id === id);
			tempArr.splice(index, 1);
			setFavorites(tempArr);
		}
	};

	return (
		<div
			className='heroCard'
			key={hero.id}>
			<img
				src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
				alt={hero.name}
			/>
			<div className='heroFooter'>
				<div className='heroName'>
					<h4>{hero.name}</h4>
				</div>
				<label
					htmlFor={`favorite-${hero.id}`}
					className='favoriteInput'>
					<Heart
						favorite={
							favorites.find((obj) => obj.id === hero.id) ? true : false
						}
					/>
					<input
						type='checkbox'
						name={`favorite-${hero.id}`}
						id={`favorite-${hero.id}`}
						onChange={(event) => handleOnChange(event, hero.id)}
					/>
				</label>
			</div>
		</div>
	);
}
