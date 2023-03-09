import styled from '@emotion/styled';
import {
	QueryErrorResetBoundary,
	useQuery,
	useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { instance } from 'api';
import { getCampaignList } from 'api/campaign';
import { AxiosError, AxiosResponse } from 'axios';
import { campaignList } from 'common/mockUp';
import ErrorFallback from 'components/common/ErrorFallback';
import Layout from 'components/layout/Layout';
import ListItem from 'components/table/ListItem';
import SectionTitle from 'components/table/SectionTitle';
import Pagelable from 'components/ui/Pagelable';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { errorModalStateAction } from 'store/state/errorModal';

const CampaignBox = styled.div``;

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

function campaign(): JSX.Element {
	const [params, setParams] = useState({ page: 1, size: 25 });

	// const { reset } = useQueryErrorResetBoundary();
	const dispatch = useDispatch();
	const { data, status, isError, error } = useQuery(
		['getCampaignList', params],
		async () =>
			await instance.get('/api/campaigns', {
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
			// useErrorBoundary: true,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			onError(err: AxiosError) {
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
		<Layout>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<CampaignBox>
					<SectionTitle>캠페인 관리</SectionTitle>
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
					</TableWrapper>
					<Pagelable
						limit={10}
						selectPage={params.page}
						pageSclae={params.size}
						totalPage={330}
						onSelect={selected => onClickSelectViewPage(selected)}
					/>
				</CampaignBox>
			</ErrorBoundary>
		</Layout>
	);
}

export default campaign;
