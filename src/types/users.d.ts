/**
 * @interface IUserRequestParam
 * @description 사용자생성
 */
export interface IUserRequestParam {
	name: string; //이름
	email: string; //이메일(로그인아이디)
	password: string; //비밀번호
	repeat_password: string; //비밀번호 확인
}

/**
 * @interface IUsersListRes
 * @description 사용자 리스트 조회
 */
export interface IUsersListRes {
	content: Array<IUser>;
}

/**
 * @interface IUser
 * @description 사용자테이블 유저 아이템
 */
export interface IUser {
	id: int; // 사용자 ID
	email: string; // 이메일(로그인아이디)
	name: string; // 이름
	last_login_at: timestamp; // 마지막 로그인 일시
}

/**
 * @interface IUserRes
 * @description 사용자생성
 */
export interface IUserRes {
	result: boolean; //결과
	id: int; //사용자 ID
}
