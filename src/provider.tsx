import { createContext, useContext, useState } from 'react';

interface FavoriteInterface {
	setFavorites: React.Dispatch<React.SetStateAction<unknown[]>>;
	favorites: unknown[];
}

const FavoriteContext = createContext<FavoriteInterface | null>(null);

export default function FavoriteProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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
