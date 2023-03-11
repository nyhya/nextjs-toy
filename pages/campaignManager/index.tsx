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
import CampaignTable from 'components/campaign/Table';
import ErrorFallback from 'components/common/ErrorFallback';
import Layout from 'components/layout/Layout';
import ErrorModal from 'components/modal/ErrorModal';

import SectionTitle from 'components/table/SectionTitle';
import Pagelable from 'components/ui/Pagelable';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import { errorModalStateAction } from 'store/state/errorModal';

const CampaignBox = styled.div``;

const TableWrapper = styled.div`
	min-height: 700px;
`;

function campaign(): JSX.Element {
	const [errorModalToggle, setErrorModalToggle] = useState(false);
	/**
	 * @function handleOnError
	 * @param error
	 */
	const handleOnError = error => {
		console.log('캠페인 페이지 ErrorBoundary', error);
		setErrorModalToggle(true);
		// react-error-boundary를 사용하면 컴포넌트에서 제고하는 FallbackComponent나 onError같은
		// Props를 사용하여 사용자에게 Fallback UI를 편리하게 보여주고 AEM에 에러 리포팅을 수행하는 등의
		// 기능을 편리하게 구현할 수 있습니다.

		// 더 나아가 resetErrorBoundary 함수를 FallbackComponent컴포넌트의 Props로 제공하므로
		// “다시 시도” 등의 UI 요소도 쉽게 추가할 수 있으니, Error Boundary 사용이 필요한 상황에서
		// 선택지 중 하나로 고려하지 않을 이유가 없겠죠?
	};

	const InfoLoading = () => (
		<div> suspense fallback components 정보를 불러오는 중입니다. </div>
	);

	return (
		<Layout>
			<ErrorModal
				modaltoggle={errorModalToggle}
				setModalToggle={setErrorModalToggle}
			/>
			<CampaignBox>
				<SectionTitle>캠페인 관리</SectionTitle>
			</CampaignBox>
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={handleOnError}>
				<Suspense fallback={<InfoLoading />}>
					<CampaignTable />
				</Suspense>
			</ErrorBoundary>
		</Layout>
	);
}

export default campaign;
