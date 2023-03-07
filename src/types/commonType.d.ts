export type AppLayoutProps = {
	children: React.ReactNode;
};

export interface ISelectType {
	idx: number;
	value: number | string | boolean;
	label: string;
	active?: boolean;
	disabled?: boolean;
	require?: boolean;
	desc?: string;
}

/**
 * 로그인한 사용자 조회
 */
export interface IIsLoginUser {
	id: int; //사용자 ID
	email: string; // 이메일(로그인아이디)
	name: string; // 이름
	company: { id: number; name: string }; // 회사
}
