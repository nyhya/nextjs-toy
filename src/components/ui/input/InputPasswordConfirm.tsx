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

interface IInputPasswordConfirmType {
	label: string;
	type: string;
	iconType?: string;
	placeholder?: string;
	require?: boolean;
	registerId: string;
	requireMessage: string;
}
function InputPasswordConfirm(props: IInputPasswordConfirmType): JSX.Element {
	const {
		label,
		type,
		require,
		iconType,
		placeholder,
		registerId,
		requireMessage,
	} = props;

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
						validate: {
							matchesPreviousPassword: value =>
								value === methods.getValues(`userPassword`) ||
								'??????????????? ???????????? ????????????',
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

export default InputPasswordConfirm;

// ???????????? ?????? -????????? Validation ??????
// 1) ?????????
//  - ??????: ??????????????? ???????????????.
// 2) ????????? ??????????????? ???????????? ?????? ??????
//  - ??????: ??????????????? ???????????? ????????????.
