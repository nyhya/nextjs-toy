import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
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
		async function (error: AxiosError) {
			// return Promise.reject(error.response?.status);
			return Promise.reject(error);
		},
	);

	return instance;
}

// const request: (url: string, method: string, data?: any) => Promise<IAxiosResponse> = async (
// 	url: string,
// 	method: string,
// 	data?: any,
// ) => {
// 	try {
// 		const ret: AxiosResponse =
// 			['GET', 'PATCH'].includes(method) && data
// 				? await instance({
// 						url: `${url}${jsonToQueryString(data)}`,
// 						method,
// 				  })
// 				: await instance({ url, method, data });
// 		return <IAxiosResponse>{
// 			code: ret.status,
// 			success: ret.status >= 200 && ret.status < 300,
// 			data: ret.data,
// 		};
// 	} catch (err) {
// 		if (isAxiosError(err) && err.response) {
// 			return <IAxiosResponse>{
// 				success: false,
// 				code: err.response.status,
// 				msg: err.message,
// 				idontnow: err.response.status === 401,
// 			};
// 		}
// 		return <IAxiosResponse>{
// 			success: false,
// 			idontnow: true,
// 			msg: String(err),
// 		};
// 	}
// };
