import styled from '@emotion/styled';
import { AppLayoutProps } from '../../types/commonType';

const SectionTitleBox = styled.p`
	font-size: 18px;
	color: ${props => props.theme['textBlack']};
	padding: 20px 0px;
`;

export default function SectionTitle({ children }: AppLayoutProps) {
	return <SectionTitleBox>{children}</SectionTitleBox>;
}
