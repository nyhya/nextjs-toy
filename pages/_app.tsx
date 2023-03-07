import { ThemeProvider } from '@emotion/react';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { wrapper } from 'store';
import GlobalStyle from '../styles/global';
import globalTheme from '../styles/globalTheme';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ThemeProvider theme={globalTheme}>
					<GlobalStyle />
					<Component {...pageProps} />
				</ThemeProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default wrapper.withRedux(MyApp);
