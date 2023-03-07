import styled from '@emotion/styled';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BtnMasking } from '../Button';

const InputPasswordBox = styled.div`
	width: calc(100% - 40px);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 30px;
	.label-box {
		width: 100%;
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
	}

	.input-box {
		position: relative;
		width: 100%;
		input {
			width: 100%;
			height: 40px;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			/* border-radius: 4px; */
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			border: solid 1px ${props => props.theme['borderNormal']};
			background-color: #fff;
			padding: 10px;
		}

		.warning-message {
			color: #f00;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
			padding: 10px 15px;
			margin-top: 10px;
		}
	}
`;

interface IInputPasswordType {
	label: string;
	type: string;
	iconType?: string;
	placeholder?: string;
	require?: boolean;
	registerId: string;
	requireMessage: string;
}
function InputPassword(props: IInputPasswordType): JSX.Element {
	const { label, type, registerId, iconType, placeholder, requireMessage } =
		props;
	const [masking, setMasking] = useState(true);
	const methods = useFormContext();
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = methods;

	const onClickMaskingHandler = () => {
		setMasking(!masking);
	};

	return (
		<InputPasswordBox>
			<div className="label-box">
				<label htmlFor="inputName">{label}</label>
				<span className="require">*</span>
			</div>

			<div className="input-box">
				<BtnMasking
					type="button"
					masking={masking}
					onClick={onClickMaskingHandler}
				/>
				<input
					type={masking ? 'password' : 'text'}
					{...register(`${registerId}`, {
						required: `${requireMessage}`,
						minLength: {
							value: 8,
							message: '8~15자 영문, 숫자, 특수문자를 사용하세요.',
						},
						maxLength: {
							value: 15,
							message: '8~15자 영문, 숫자, 특수문자를 사용하세요.',
						},
						pattern: {
							value: /^(?=.*[a-zA-Z])(?=.*[!@#&$%^*+=-])(?=.*[0-9]).{8,15}$/,
							message: '8~15자 영문, 숫자, 특수문자를 사용하세요.',
						},
					})}
					placeholder={placeholder}
				/>
				{errors && errors[`${registerId}`] && (
					<p className="warning-message">{`${
						errors[`${registerId}`]?.message
					}`}</p>
				)}
			</div>
		</InputPasswordBox>
	);
}

export default InputPassword;

// 비밀번호
// - placeholder 제공 “영문, 숫자, 특수문자 조합 8~15자
// - 비밀번호: 영문, 숫자, 특수문자 조합 8~15자 입력 가능
// - 마스킹 Default값: 마스킹 처리(마스킹 해제시 그대로 표기)

// -상황별 Validation 제공
// 1) 미입력 - 문구: 비밀번호를 입력하세요.
// 2) 사용불가한 경우
// (영문, 숫자, 특수문자중 미입력, 8자 미만으로 입력 15자 초과, 공백 입력) - 문구: 8~15자 영문, 숫자, 특수문자를 사용하세요.
