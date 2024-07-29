import ComicBook from '../../assets/AssetsComponents/ComicBook';
import Heart from '../../assets/AssetsComponents/Heart';
import LogoMarvel from '../../assets/AssetsComponents/LogoMarvel';
import Lupa from '../../assets/AssetsComponents/Lupa';
import Rating from '../../assets/AssetsComponents/Rating';
import { useFavorites, usePages } from '../../provider';

import './HeroDetail.css';

export default function HeroDetail() {
	const { favorites, setFavorites } = useFavorites();
	const { heroDetail, setPage } = usePages();

	console.log(heroDetail);

	const heroDate = new Date(`${heroDetail.modified}`);
	const heroComics = heroDetail.comics.items.slice(0, 10);

	const handleOnChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		id: number
	) => {
		if (
			event.target.checked &&
			favorites.length < 5 &&
			!favorites.find((hero: any) => hero.id === id)
		) {
			const tempArr = favorites.slice();
			tempArr.push(heroDetail);
			setFavorites(tempArr);
		} else if (favorites.find((hero: any) => hero.id === id)) {
			const tempArr = favorites.slice();
			const index = tempArr.indexOf((hero: any) => hero.id === id);
			tempArr.splice(index, 1);
			setFavorites(tempArr);
		}
	};

	return (
		<main className='heroPage'>
			<header className='heroHeader'>
				<div
					className='logo'
					onClick={() => setPage('home')}>
					<LogoMarvel />
				</div>
				<div className='searchHero'>
					<label htmlFor='searchInput'>
						<Lupa />
					</label>
					<input
						type='search'
						name='searchInput'
						id='searchInput'
						placeholder='Procure por heróis'
					/>
				</div>
			</header>
			<div className='mainInfo'>
				<div className='heroDetails'>
					<section className='mainBlock'>
						<div className='heroName'>
							<h2>{heroDetail.name}</h2>
							<label
								htmlFor='favorite'
								className='favoriteInput'>
								<Heart
									favorite={
										favorites.find((obj: any) => obj.id === heroDetail.id)
											? true
											: false
									}
								/>
								<input
									type='checkbox'
									name='favorite'
									id='favorite'
									onChange={(event) => handleOnChange(event, heroDetail.id)}
								/>
							</label>
						</div>
						<p className='heroDescription'>{heroDetail.description}</p>
						<section className='comics'>
							<h4>Quadrinhos</h4>
							<p>
								<ComicBook />
								{heroDetail.comics.available}
							</p>
						</section>
						<div className='rating'>
							<strong>Rating:</strong>
							<Rating />
						</div>
						<section className='lastUpdate'>
							<h4>Ultimo quadrinho</h4>
							<p>
								{heroDate.toLocaleString('pt-br', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</section>
					</section>
					<img
						src={`${heroDetail.thumbnail.path}.${heroDetail.thumbnail.extension}`}
						alt={heroDetail.name}
						className='heroImage'
					/>
				</div>
			</div>
			<div className='lastComics'>
				<h2>Últimos lançamentos</h2>
				<ul>
					{heroComics.map((comic: any) => (
						<li>
							{/* A API não retorna imagens das capas das HQs */}
							<img
								src='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
								alt='Not available'
							/>
							<strong>{comic.name}</strong>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
