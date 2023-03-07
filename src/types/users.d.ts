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

export interface IUser {
	id: int; // 사용자 ID
	email: string; // 이메일(로그인아이디)
	name: string; // 이름
	last_login_at: timestamp; // 마지막 로그인 일시
	total_elements: int; // 모든 엘리먼트 숫자
	total_pages: int; // 전체 페이지수
	last: boolean; // 마지막 페이지 여부
	number: int; // 페이지 번호 (0부터 시작)
	size: int; // 페이지당 엘리먼트 수
	sort: object; // 정렬 기준
	number_of_elements: int; // 조회한 엘리먼트 수
	first: boolean; // 첫번째 페이지 여부
	empty: boolean; // 공백 여부
}

/**
 * @interface IUserRes
 * @description 사용자생성
 */
export interface IUserRes {
	result: boolean; //결과
	id: int; //사용자 ID
}
