import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ModalButtonType } from 'common/designType';

export const ModalButton = styled.button<{ btnType: ModalButtonType }>`
	padding: 10px 15px 8px 15px;
	border-radius: 5px;
	color: #fff;
	line-height: 15px;
	margin-bottom: 20px;

	${props => {
		switch (props.btnType || props) {
			case ModalButtonType.ACTIVE:
				return css`
					background-color: ${props.theme['primary']};
				`;
			case ModalButtonType.CANCLE:
				return css`
					background-color: ${props.theme['borderNormal']};
				`;
		}
	}}
`;

export const BtnMasking = styled.button<{ masking: boolean }>`
	position: absolute;
	right: -39px;
	top: 0;
	width: 40px;
	height: 40px;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	border: 1px solid ${props => props.theme['borderNormal']};

	${props => {
		switch (props.masking) {
			case true:
				return css`
					background: url('/icon/opened-eye.svg') no-repeat center center/15px
							auto,
						#edf2fb;
				`;
			case false:
				return css`
					background: url('/icon/closed_eye.svg') no-repeat center center/15px
							auto,
						#edf2fb;
				`;
		}
	}}
`;
