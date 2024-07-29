import { createContext, useContext, useState } from 'react';

interface FavoriteInterface {
	setFavorites: React.Dispatch<React.SetStateAction<unknown[]>>;
	favorites: unknown[];
}

const FavoriteContext = createContext<FavoriteInterface | null>(null);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
	const [favorites, setFavorites] = useState<unknown[]>([]);

	return (
		<FavoriteContext.Provider value={{ favorites, setFavorites }}>
			{children}
		</FavoriteContext.Provider>
	);
}

export function useFavorites(): FavoriteInterface {
	const context = useContext(FavoriteContext);

	if (!context) {
		throw new Error(
			'useFavorites deve ser usado dentro de um FavoritesProvider!'
		);
	}

	return context;
}

interface PageInterface {
	setPage: React.Dispatch<React.SetStateAction<string>>;
	page: string;
	heroDetail: any;
	setHeroDetail: React.Dispatch<React.SetStateAction<any>>;
}

const PageContext = createContext<PageInterface | null>(null);

export function PageProvider({ children }: { children: React.ReactNode }) {
	const [page, setPage] = useState<string>('home');
	const [heroDetail, setHeroDetail] = useState(null);

	return (
		<PageContext.Provider value={{ setPage, page, heroDetail, setHeroDetail }}>
			{children}
		</PageContext.Provider>
	);
}

export function usePages() {
	const context = useContext(PageContext);

	if (!context) {
		throw new Error('usePages deve ser usado dentro de um PageProvider!');
	}

	return context;
}
