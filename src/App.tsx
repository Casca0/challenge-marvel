import HeroDetail from './pages/HeroDetail/HeroDetail';
import Main from './pages/Main/Main';
import { usePages } from './provider';

export default function App() {
	const { page } = usePages();

	if (page === 'home') {
		return <Main />;
	}
	if (page === 'hero') {
		return <HeroDetail />;
	}
}
