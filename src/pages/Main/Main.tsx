/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';

import './Main.css';
import LogoMarvel from '../../assets/AssetsComponents/LogoMarvel';
import Lupa from '../../assets/AssetsComponents/Lupa';
import Heroes from '../../components/Heroes';
import HeroLogo from '../../assets/AssetsComponents/HeroLogo';
import Heart from '../../assets/AssetsComponents/Heart';
import { useFavorites } from '../../provider';

function Main() {
	const publicKey = import.meta.env.VITE_PUBLIC_KEY;
	const privateKey = import.meta.env.VITE_PRIVATE_KEY;
	const timestamp = new Date().getTime().toString();
	const apiHash = md5(timestamp + privateKey + publicKey);
	const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${apiHash}`;

	const [heroes, setHeroes] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [sort, setSort] = useState<boolean>(false);
	const [favoriteFilter, setFavoriteFilter] = useState<boolean>(true);
	const [visibleHeroes, setVisibleHeroes] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const { favorites } = useFavorites();

	useEffect(() => {
		const fetchHeroes = async () => {
			// Tempo de resposta muito lento!
			const apiRes = await axios.get(apiUrl).catch((reason) => {
				setError(true);
				console.log(reason.message);
			});
			setHeroes(apiRes?.data.data.results);
			setVisibleHeroes(apiRes?.data.data.results);
			setLoading(false);
		};

		if (heroes.length === 0) {
			fetchHeroes();
		}
		return;
	}, [heroes, apiUrl]);

	useEffect(() => {
		function renderHeroes() {
			if (sort) {
				setVisibleHeroes(sortedHeroesArr);
				return;
			}
		}
		renderHeroes();
	});

	const sortedHeroesArr = heroes.slice();

	// O resultado da API já vem organizado alfabeticamente

	sortedHeroesArr.sort((a: any, b: any) => {
		const heroNameA = a.name.toUpperCase();
		const heroNameB = b.name.toUpperCase();
		return heroNameA < heroNameB ? -1 : heroNameA > heroNameB ? 1 : 0;
	});

	const handleOnChange = () => {
		setSort(!sort);
	};

	const handleHeroSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;
		setSearchTerm(searchValue);

		const filteredHeroes = heroes.filter((hero: any) =>
			hero.name.toLowerCase().includes(searchValue.toLowerCase())
		);

		setVisibleHeroes(filteredHeroes);
	};

	const handleFavoriteFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.checked) {
			setFavoriteFilter(false);
			setVisibleHeroes(heroes);
		} else {
			setFavoriteFilter(true);
			setVisibleHeroes(favorites);
		}
	};

	return (
		<main className='mainContent'>
			<header className='mainHeader'>
				<LogoMarvel />
			</header>
			<section>
				<h1>EXPLORE O UNIVERSO</h1>
				<p>
					Mergulhe no domínio deslumbrante de todos os personagens clássicos que
					você ama - e aqueles que você descobrirá em breve!
				</p>
			</section>
			<div className='search'>
				<label htmlFor='searchInput'>
					<Lupa />
				</label>
				<input
					type='search'
					name='searchInput'
					id='searchInput'
					value={searchTerm}
					onChange={handleHeroSearch}
					placeholder='Procure por heróis'
				/>
			</div>
			{error && <div>Ocorreu um erro na requisição!</div>}
			{loading ? (
				<span className='loader'></span>
			) : (
				<>
					<div className='heroesHeader'>
						<h3>Encontrados {heroes.length} heróis</h3>
						<div className='sortFilter'>
							<HeroLogo />
							<p>Ordenar por nome - A/Z</p>
							<label
								htmlFor='checkbox'
								className='switch'>
								<input
									type='checkbox'
									id='checkbox'
									onChange={handleOnChange}
								/>
								<div className='slider round'></div>
							</label>
							<label
								htmlFor='favoriteFilter'
								className='favoriteFilter'>
								<Heart favorite={favoriteFilter} />
								<input
									type='checkbox'
									name='favoriteFilter'
									id='favoriteFilter'
									onChange={handleFavoriteFilter}
								/>
							</label>
							<p>Somente favoritos</p>
						</div>
					</div>
					<div className='listHeroes'>
						{visibleHeroes.map((hero) => (
							<Heroes hero={hero} />
						))}
					</div>
				</>
			)}
		</main>
	);
}

export default Main;


