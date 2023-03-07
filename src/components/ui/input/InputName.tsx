import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const InputNameBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 30px;
	.label-box {
		width: 100%;
		margin-bottom: 5px;
		text-align: left;
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
		width: 100%;
		input {
			width: 100%;
			height: 40px;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			border-radius: 4px;
			border: solid 1px ${props => props.theme['borderNormal']};
			background-color: #fff;
			padding: 10px;
		}

		.warning-message {
			color: #f00;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
			padding: 10px 15px;
			margin-top: 10px;
			text-align: left;
		}
	}
`;

interface IInputNameType {
	label: string;
	type: string;
	iconType?: string;
	placeholder?: string;
	require?: boolean;
	registerId: string;
	requireMessage: string;
}
function InputName(props: IInputNameType): JSX.Element {
	const {
		label,
		type,
		require,
		iconType,
		placeholder,
		registerId,
		requireMessage,
	} = props;

	const methods = useFormContext();
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = methods;

	return (
		<InputNameBox>
			<div className="label-box">
				<label htmlFor="inputName">{label}</label>
				<span className="require">*</span>
			</div>

			<div className="input-box">
				<input
					type="text"
					{...register(`${registerId}`, {
						required: `${requireMessage}`,
						minLength: {
							value: 1,
							message:
								'이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가',
						},
						maxLength: {
							value: 16,
							message:
								'이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가',
						},

						pattern: {
							value: /^[가-힣a-zA-Z]+$/,
							message:
								'이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가',
						},
					})}
					placeholder={`${requireMessage}`}
				/>
				{errors && errors[`${registerId}`] && (
					<p className="warning-message">{`${
						errors[`${registerId}`]?.message
					}`}</p>
				)}
			</div>
		</InputNameBox>
	);
}

export default InputName;

// 이름
// - 한글, 영문 1~16자 입력 가능

// -상황별 Validation 제공
// 1) 미입력
//  - 문구: 이름을 입력하세요.
// 2) 한글, 영문, 1~16자가 아닌 경우
//  - 문구: 이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력 불가
