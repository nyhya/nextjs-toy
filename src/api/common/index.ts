import { instance } from 'api';

/**
 * @function isLoginUser
 * @description 로그인된 사용자
 */
export const isLoginUser = async () => {
	try {
		const res = await instance.get('/api/auth/me');
		if (res) {
			return res;
		}
	} catch (errorStatusCode) {
		// if(errorStatusCode){
		// }
	}
};
