import { AxiosInstance } from 'axios';
import { BrowserGetCookie } from 'common/utils/cookie';

export function setInterceptors(instance: AxiosInstance) {
	instance.interceptors.request.use(
		function (config) {
			if (config.headers !== undefined) {
				config.headers.Authorization = `Bearer ${BrowserGetCookie(
					'accessToken',
				)}`;
			}

			return config;
		},
		function (error) {
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// 서버에 요청을 보내고 응답을 받기전에 처리
			return response;
		},
		async function (error) {
			return Promise.reject(error);
		},
	);

	return instance;
}
