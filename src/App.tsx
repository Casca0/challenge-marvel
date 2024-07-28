import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';

import './App.css';
import LogoMarvel from './assets/AssetsScript/LogoMarvel';

function App() {
	// Essas keys ficariam em um arquivo .env

	const publicKey = '941622d8572b1aa1a1903e04314670a6';
	const privateKey = '2a532dfd2eaf7c1a005ee7e7787590af9e16cb45';
	const timestamp = new Date().getTime().toString();
	const apiHash = md5(timestamp + privateKey + publicKey);

	const [apiUrl, setApiUrl] = useState(
		`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${apiHash}`
	);
	const [heroes, setHeroes] = useState(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchHeroes = async () => {
			const apiRes = await axios.get(apiUrl);
			setHeroes(apiRes.data.data.results);
			setLoading(false);
		};

		if (!heroes) {
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
		</main>
	);
}

export default App;


