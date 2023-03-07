import { ISelectType } from 'types/commonType';

/**
 * 헤더네비게이션path
 */
export const routerPath: Array<ISelectType> = [
	{
		idx: 1,
		value: '/',
		label: 'HOME',
	},
	{
		idx: 2,
		value: '/campaignManager',
		label: '캠페인',
	},
	{
		idx: 3,
		value: '/userManager',
		label: '사용자',
	},
];

/**
 * 사용자권한정보
 */
export const userAuthList: Array<ISelectType> = [
	{
		idx: 1,
		value: '어드민',
		label: '어드민',
	},
	{
		idx: 2,
		value: '매니저',
		label: '매니저',
	},
	{
		idx: 3,
		value: '뷰어',
		label: '뷰어',
	},
];
