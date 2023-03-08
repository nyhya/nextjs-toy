import { instance } from 'api';
import { IUserRequestParam } from 'types/users';

/**
 * @function usesrList
 * @description 사용자 리스트 조회
 * @param 페이징
 * @param 사이즈
 */
export const getUsesrList = async (page: number, size: number) => {
	try {
		const res = instance.get('/api/users', {
			params: { page: page, size: size },
		});
		if (res) {
			return res;
		}
	} catch (error) {
		console.log('usesrList error');
	}
};

/**
 * @function userCreate
 * @description 사용자 생성
 */
export const postUserCreate = async (param: IUserRequestParam) => {
	try {
		const res = await instance.post(`/api/users`, {
			name: param.email,
			email: param.email,
			password: param.password,
			repeat_password: param.repeat_password,
		});

		if (res) {
			return res;
		}
	} catch (e) {
		console.log('userCreate error');
	}
};

/**
 * @function userUpdate
 * @description 사용자 수정
 * @param Path 사용자 아이디
 * @param name 사용자 이름
 */
export const patchUserUpdate = async (id: string, name: string) => {
	try {
		const res = await instance.patch(` /api/users/${id}`, {
			name: name,
		});

		if (res) {
			return res;
		}
	} catch (e) {
		console.log('userCreate error');
	}
};

/**
 * @function duplicateEmail
 * @description 이메일 중복 체크
 * @param email 이메일
 */
export const getDuplicateEmail = async (email: string) => {
	try {
		const res = await instance.get<{ result: boolean }>(
			`/api/users/${email}/exists`,
		);
		if (res) {
			return res;
		}
	} catch (e) {
		console.log('duplicateEmail error');
	}
};
