import styled from '@emotion/styled';
import { useState } from 'react';
import ReactSwitch from 'react-switch';

const ListItemBox = styled.tr``;

interface ICampaignItemProps {
	id: number; // 캠페인 ID
	name: string; // 캠페인명
	enabled: boolean; //상태 true  false
	campaign_objective: string; // 캠페인 목적
	// WEBSITE_CONVERSIONS: "웹사이트 전환",
	// WEBSITE_TRAFFIC: "웹사이트 트래픽",
	// SALES: "판매",
	// APP_INSTALLATION: "앱설치",
	// LEAD: "리드",
	// BRAND: "브랜드 인지도 및 도달 범위",
	// VIDEO_VIEWS: "동영상 조회",
	impressions: number; // 노출수
	clicks: number; // 클릭수
	ctr: number; // CTR
	video_views: number; // 비디오조회수
	vtr: number; // VTR
}

function ListItem(props: ICampaignItemProps): JSX.Element {
	const {
		name,
		campaign_objective,
		impressions,
		clicks,
		ctr,
		video_views,
		enabled,
	} = props;

	const [onActive, setOnActive] = useState(enabled);

	const onChangeActiveHandler = (active: boolean) => {
		setOnActive(!onActive);
	};

	return (
		<ListItemBox>
			<td>
				<ReactSwitch
					onChange={bool => onChangeActiveHandler(bool)}
					checked={onActive}
					// disabled={true}
					checkedIcon={false}
					uncheckedIcon={false}
					width={40}
					height={20}
					handleDiameter={16}
					onColor="#4e8bf4"
					offColor="#dddddd"
				/>
			</td>
			<td>{name}</td>
			<td>{campaign_objective}</td>
			<td>{impressions}</td>
			<td>{clicks}</td>
			<td>{ctr}</td>
			<td>{video_views}</td>
		</ListItemBox>
	);
}

export default ListItem;
