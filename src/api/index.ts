import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
	const instance = axios.create({
		headers: {
			withCredentials: true,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json',
		},
	});

	return setInterceptors(instance);
}

export const instance = createInstance();
// const { isAxiosError } = axios;
// export type { AxiosError, AxiosResponse };
// export { instance, isAxiosError };
