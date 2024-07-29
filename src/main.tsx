import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import './index.css';
import { FavoriteProvider, PageProvider } from './provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PageProvider>
			<FavoriteProvider>
				<App />
			</FavoriteProvider>
		</PageProvider>
	</React.StrictMode>
);





