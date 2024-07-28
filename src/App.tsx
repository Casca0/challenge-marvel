import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';

import './App.css';
import LogoMarvel from './assets/AssetsComponents/LogoMarvel';
import Lupa from './assets/AssetsComponents/Lupa';
import Heroes from './components/Heroes';

function App() {
	const publicKey = import.meta.env.VITE_PUBLIC_KEY;
	const privateKey = import.meta.env.VITE_PRIVATE_KEY;
	const timestamp = new Date().getTime().toString();
	const apiHash = md5(timestamp + privateKey + publicKey);

	const [apiUrl, setApiUrl] = useState(
		`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${apiHash}`
	);
	const [heroes, setHeroes] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const fetchHeroes = async () => {
			const apiRes = await axios.get(apiUrl).catch((reason) => {
				setError(true);
				console.log(reason.message);
			});
			setHeroes(apiRes?.data.data.results);
			setLoading(false);
		};

		if (heroes.length === 0) {
			fetchHeroes();
		}
		return;
	}, [heroes, apiUrl]);

	return (
		<main>
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
					placeholder='Procure por heróis'
				/>
			</div>
			{loading ? (
				<span className='loader'></span>
			) : (
				<div className='listHeroes'>
					{heroes?.map((hero) => (
						<Heroes hero={hero} />
					))}
				</div>
			)}
		</main>
	);
}

export default App;


