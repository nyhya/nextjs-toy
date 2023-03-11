import { instance } from 'api';
import { IUserRes } from 'types/users';

/**
 * @description 캠페인 리스트 조회
 */
// export const getCampaignList = async (page: number, size: number) => {
// 	const res = await instance.get<IUserRes>('/api/campaigns', {
// 		params: {
// 			page: page,
// 			size: size,
// 		},
// 	});
// 	if (res) {
// 		return res;
// 	}
// };
export const getCampaignList = async (page: number, size: number) => {
	try {
		const res = await instance.get<IUserRes>('/api/campaigns', {
			params: {
				page: page,
				size: size,
			},
		});
		if (res) {
			return res;
		}
	} catch (error) {
		console.error('getCampaignList', error);
		return error;
	}
};

/**
 * @function campaignStateUpdate
 * @description 캠페인상태 수정
 * @param id 캠페인 ID
 * @param enabled 상태
 */
export const PatchCampaignStateUpdate = async (
	id: string,
	enabled: boolean,
) => {
	try {
		const res = await instance.patch(`/api/campaigns/${id}`, {
			enabled: enabled,
		});
	} catch (error) {
		console.log('campaignState error');
	}
};
