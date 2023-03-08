import styled from '@emotion/styled';
import { AppLayoutProps } from 'types/commonType';

const SectionLableBox = styled.p`
	width: 100%;
	text-align: left;
	margin-bottom: 5px;
	label {
		font-size: 16px;
		font-weight: 600;
		color: ${props => props.theme['textNormal']};
	}
	.require {
		color: #f00;
		line-height: 16px;
		font-size: 16px;
		padding-left: 5px;
	}
`;

export default function SectionLable({ children }: AppLayoutProps) {
	return (
		<SectionLableBox>
			<label htmlFor="inputName">{children}</label>
			<span className="require">*</span>
		</SectionLableBox>
	);
}
