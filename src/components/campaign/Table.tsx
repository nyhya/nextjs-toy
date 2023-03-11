import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { instance } from 'api';
import { getCampaignList } from 'api/campaign';
import { AxiosError } from 'axios';
import { campaignList } from 'common/mockUp';
import ListItem from 'components/table/ListItem';
import Pagelable from 'components/ui/Pagelable';
import { useState } from 'react';

const TableWrapper = styled.div`
	min-height: 700px;
`;

const StyledTable = styled.table`
	width: 100%;
	border-top: 1px solid #000;
	font-size: 14px;
	color: #202020;
	text-align: center;
	thead tr {
	}
	thead tr th {
		font-size: 13px;
		color: ${props => props.theme['textLight']};
		vertical-align: middle;
		padding: 12px 0px;
	}
	tbody tr {
		cursor: pointer;
	}
	tr {
		border-bottom: 1px solid #dddddd;
	}

	td {
		padding: 9px 0;
	}
	td.title-cell {
		text-align: left;
	}
	.state-cell {
		width: 50px;
	}
	.name-cell {
		width: 250px;
	}
	.purpose-cell {
		width: 300px;
	}
	.normal-cell {
		width: 150px;
	}
`;

function CampaignTable(): JSX.Element {
	const [params, setParams] = useState({ page: 1, size: 25 });

	// const { reset } = useQueryErrorResetBoundary();
	// const dispatch = useDispatch();
	const { data, status, isError, error } = useQuery(
		['getCampaignList', params],
		async () =>
			await await instance.get('/api/campaigns', {
				params: {
					page: params.page,
					size: params.size,
				},
			}),
		{
			onSuccess(data: AxiosError) {
				console.log('data', data.response?.status);
			},
			// useErrorBoundary(error: any, query) {
			// 	return error.response?.status >= 500;
			// },
			suspense: true, // 데이터 불러오기를 위한 Suspense를 활성화하는 옵션
			// suspense 옵션을 통해 useQuery Hook을 "Suspense를 지원하는 특별한 객체"로 사용합니다.
			// suspense 옵션이 켜져 있는 경우 Error Boundary를 통한 에러 처리도 가능합니다.
			// useErrorBoundary: true, // Error Boundary 사용을 위한 옵션. suspense 옵션이 true인 경우에는 기본값이 true로 설정된다.
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: 0,
			onError(err) {
				// dispatch(errorModalStateAction.rdxOpenModalToggle(true));
				// 실패시 호출
				// (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
				// 강제로 에러 발생시키려면 api단에서 throw Error 날립니다.
				// 	주로 4xx 오류는 로컬 콜백으로 처리합니다(5xx 에러는 useErrorBoundary 사용).
				// 오류를 컴포넌트 각각에서 처리하지 않고 한번에 처리하거나, 사용자에게 알릴 목적이면
				// QueryCache / MutationCache 의 필드를 사용합니다.
			},
		},
	);

	// const { data, status, isError, error } = useQuery(
	// 	['getCampaignList', params],
	// 	() => getCampaignList(params.page, params.size),

	// 	{
	// 		onSuccess(data: AxiosError) {
	// 			console.log('data', data.response?.status);
	// 		},

	// 		refetchOnWindowFocus: false,
	// 		refetchOnMount: true,
	// 		onError(err: AxiosError) {
	// 			console.log('error', err);
	// 		},
	// 	},
	// );

	// ['getCampaignList', params],
	// async () =>
	//     await await instance.get('/api/campaigns', {
	//         params: {
	//             page: params.page,
	//             size: params.size,
	//         },
	//     }),

	/**
	 * @function onClickSelectViewPage
	 * @param select 선택한 페이지 넘버
	 * @description 페이지네이션 선택
	 */
	const onClickSelectViewPage = (select: number) => {
		console.log(select);
		setParams({ ...params, page: select });
	};

	return (
		<TableWrapper>
			<StyledTable>
				<thead>
					<tr>
						<th className="state-cell">상태</th>
						<th className="name-cell">캠페인명</th>
						<th className="purpose-cell">캠페인목적</th>
						<th className="normal-cell">노출수</th>
						<th className="normal-cell">클릭수</th>
						<th className="normal-cell">CTR</th>
						<th className="normal-cell">동영상 조회수</th>
						<th className="normal-cell">VTR</th>
					</tr>
				</thead>
				<tbody>
					{campaignList &&
						campaignList.content.map(item => {
							return (
								<ListItem
									key={item.id}
									name={item.name}
									campaign_objective={item.campaign_objective}
									id={item.id}
									enabled={item.enabled}
									clicks={item.clicks}
									ctr={item.ctr}
									video_views={item.video_views}
									impressions={item.impressions}
									vtr={item.vtr}
								></ListItem>
							);
						})}
				</tbody>
			</StyledTable>
			<Pagelable
				limit={10}
				selectPage={params.page}
				pageSclae={params.size}
				totalPage={330}
				onSelect={selected => onClickSelectViewPage(selected)}
			/>
		</TableWrapper>
	);
}

export default CampaignTable;
