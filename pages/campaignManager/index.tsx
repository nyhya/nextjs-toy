import styled from '@emotion/styled';
import { campaignList } from 'common/mockUp';
import Layout from 'components/layout/Layout';
import ListItem from 'components/table/CustomListItem';
import SectionTitle from 'components/table/SectionTitle';
import Pagelable from 'components/ui/Pagelable';
import { useState } from 'react';

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

	// const { data } = useQuery(
	// 	['getCampaignList', params],
	// 	() => getCampaignList(params.page, params.size),
	// );

	// useEffect(() => {
	// 	console.log(params, data);
	// }, [params, data]);

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
		</Layout>
	);
}

export default campaign;
