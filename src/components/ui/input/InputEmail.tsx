import styled from '@emotion/styled';
import { GetDuplicateEmail } from 'api/user';
import SectionLable from 'components/common/Text/SectionLable';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const InputEmailBox = styled.div`
	width: 100%;
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
		}
	}
`;

interface IInputEmailType {
	label: string;
	type: string;
	iconType?: string;
	placeholder?: string;
	require?: boolean;
	registerId: string;
	requireMessage: string;
}
function InputEmail(props: IInputEmailType): JSX.Element {
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
		<InputEmailBox>
			<SectionLable>{label}</SectionLable>
			<div className="input-box">
				<input
					type="text"
					{...register(`${registerId}`, {
						required: '아이디(이메일)을 입력하세요',
						minLength: {
							value: 9,
							message: '올바른 이메일 주소를 입력하세요.',
						},
						maxLength: {
							value: 50,
							message: '올바른 이메일 주소를 입력하세요.',
						},

						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: '올바른 이메일 주소를 입력하세요.',
						},
						// validate: {
						// 	isAvailable: async value => {
						// 		const res = await GetDuplicateEmail(value);
						// 		return (
						// 			(res && res.data.result) ||
						// 			'이미 사용중인 이메일입니다. 다른 이메일을 입력하세요'
						// 		);
						// 	},
						// },
					})}
					placeholder="이메일을 입력해 주세요."
				/>
				{errors && errors[`${registerId}`] && (
					<p className="warning-message">{`${
						errors[`${registerId}`]?.message
					}`}</p>
				)}
			</div>
		</InputEmailBox>
	);
}

export default InputEmail;

// 이메일
// 1) 미입력
//  - 문구: 아이디(이메일)을 입력하세요.

// 2) 9자 미만 입력 or 50자 초과 or 이메일 형식이 아닌 경우
//  - 문구: 올바른 이메일 주소를 입력하세요.

// 3) 이메일 중복될 경우
//  - 문구: 이미 사용중인 이메일입니다. 다른 이메일을 입력하세요
