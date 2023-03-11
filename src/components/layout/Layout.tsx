import styled from '@emotion/styled';
import Header from 'components/common/header/Header';
import ErrorModal from 'components/modal/ErrorFallbackModal';
import { AppLayoutProps } from '../../types/commonType';

const LayoutBox = styled.section`
	position: relative;
	width: 100%;
	height: 100%;
	min-width: 1024px;
	background-color: #fff;

	.container {
		position: relative;
		width: 1024px;
		height: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		/* .contents {
			position: relative;
			min-height: 100%;
			padding: 0px 26px;
		} */
	}
`;

export default function Layout({ children }: AppLayoutProps) {
	return (
		<LayoutBox>
			<Header />
			<div className="container">
				{children}
				{/* <div className="contents"></div> */}
			</div>
		</LayoutBox>
	);
}
