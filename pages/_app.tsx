import { ThemeProvider } from '@emotion/react';
import {
	Hydrate,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import ErrorModal from 'components/modal/ErrorFallbackModal';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from 'store';
import { errorModalStateAction } from 'store/state/errorModal';
import GlobalStyle from '../styles/global';
import globalTheme from '../styles/globalTheme';

export const queryErrorHandler = error => {
	console.log(error, 'app queryErrorHandler');

	// toast(`데이터를 가져오지 못했습니다! ${error.message}`);
};

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			// console.log('queryClient', error);
			// dispatch(errorModalStateAction.rdxOpenModalToggle(true));
			// if (query.state.data !== undefined) {
			// 	// toast.error(`Something went wrong: ${error.message}`)
			// 	alert(`Something went wrong: ${error}`);
			// }
			// setErrorModalToggle(true);
			// console.log('app onError', error);
		},
	}),
	defaultOptions: {
		queries: {
			// suspense: true,
			retry: 0,
			// useErrorBoundary: true,
		},
		mutations: {
			// useErrorBoundary: true,
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		console.log('queryClient');
	}, [queryClient]);

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
