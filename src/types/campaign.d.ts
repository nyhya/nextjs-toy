/**
 * @interface ICampaignListRes
 * @description 캠페인 리스트 조회
 */
export interface ICampaignListRes {
	id: number; // 캠페인 ID
	name: string; // 캠페인명
	enabled: boolean; //상태 true  false
	campaign_objective:
		| 'WEBSITE_CONVERSIONS'
		| 'WEBSITE_TRAFFIC'
		| 'SALES'
		| 'APP_INSTALLATION'
		| 'LEAD'
		| 'BRAND'
		| 'VIDEO_VIEWS'; // 캠페인 목적
	// WEBSITE_CONVERSIONS: "웹사이트 전환",
	// WEBSITE_TRAFFIC: "웹사이트 트래픽",
	// SALES: "판매",
	// APP_INSTALLATION: "앱설치",
	// LEAD: "리드",
	// BRAND: "브랜드 인지도 및 도달 범위",
	// VIDEO_VIEWS: "동영상 조회",
	impressions: number; // 노출수
	clicks: number; // 클릭수
	ctr: boolean; // CTR
	video_views: number; // 비디오조회수
	vtr: boolean; // VTR

	total_elements?: number; // 모든 엘리먼트 숫자
	total_pages?: number; // 전체 페이지수
	last?: boolean; // 마지막 페이지 여부
	number?: number; // 페이지 번호 (0부터 시작)
	size?: number; // 페이지당 엘리먼트 수
	sort?: object; // 정렬 기준
	number_of_elements?: number; // 조회한 엘리먼트 수
	first?: boolean; // 첫번째 페이지 여부
	empty?: boolean; // 공백 여부
}

/**
 * @interface campaignStateRes
 * @description 캠페인상태수정
 */
export interface campaignStateRes {
	result: boolean;
	id: int;
}
