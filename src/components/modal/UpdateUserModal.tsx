import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import { ModalButtonType } from 'common/designType';
import SectionLable from 'components/common/Text/SectionLable';
import { ModalButton } from 'components/ui/Button';
import InputName from 'components/ui/input/InputName';
// import InputEmail from 'components/ui/input/InputEmail';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Dim from './Dim';

const UpdateUserBox = styled.div<{ open: boolean | undefined }>`
	position: fixed;
	left: 0;
	bottom: -100%;
	width: 100%;
	/* height: 100%; */
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: rgba(0, 0, 0, 0.3); */
	padding: 0px 32px;
	z-index: 100000;
	animation-direction: normal;
	animation-fill-mode: forwards;
	padding-top: env(safe-area-inset-top);
	height: calc(100% + env(safe-area-inset-top));

	@keyframes slide-up {
		from {
			bottom: -100%;
		}
		to {
			bottom: 0px;
		}
	}

	@keyframes slide-down {
		from {
			bottom: 0px;
		}
		to {
			bottom: -100%;
		}
	}

	${props => {
		switch (props.open) {
			case true:
				return css`
					animation-duration: 0.4s;
					animation-name: 'slide-up';
					animation-timing-function: 'cubic-bezier(0.16, 1, 0.3, 1)';
				`;
			case false:
				return css`
					animation-duration: 0.3s;
					animation-name: 'slide-down';
					animation-timing-function: 'cubic-bezier(0.16, 1, 0.3, 1)';
				`;
		}
	}}

	.modal-box {
		width: 500px;
		header {
			position: relative;
			/* height: 60px; */
			padding: 30px 30px 40px 30px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			background-color: #fff;
			font-weight: 600;
			.title {
				font-size: 18px;
				text-align: left;
				color: ${props => props.theme['textNormal']};
			}

			button.close {
				position: absolute;
				right: 16px;
				top: 15px;
				width: 40px;
				height: 40px;
				background: url('/icon/btn-close.png') no-repeat center center/23px 23px;
			}
		}
		.contents {
			width: 100%;
			padding: 0px 30px 20px 30px;
			background-color: #fff;
			.email {
				text-align: left;
				padding: 5px 0px;
				font-size: 15px;
				margin-bottom: 20px;
			}
		}
		footer {
			width: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			background-color: #fff;
			padding-bottom: 30px;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;

			.border {
				width: calc(100% - 60px);
				height: 1px;
				border-top: 1px solid ${props => props.theme['borderNormal']};
				margin: 0 auto;
			}

			.btn-box {
				padding-top: 30px;
				display: flex;
				justify-content: center;
				/* > :irst-of-type {
                margin-right: 10px;
            } */
				.btn-cancle {
					margin-right: 10px;
				}
			}

			/* button[type='submit'] {
            width: 140px;
            height: 40px;
            border-radius: 5px;
            background-color: ${props => props.theme['primary']};
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: #fff;
        } */
		}
	}
`;

interface IFormValue {
	userUpdateId: string;
}

interface IUpdateUserProps {
	modaltoggle: boolean;
	setModalToggle: Dispatch<SetStateAction<boolean>>;
	userId: string;
}

function UpdateUserModal(props: IUpdateUserProps): JSX.Element {
	const { modaltoggle, setModalToggle, userId } = props;
	const [open, setOpen] = useState<boolean>();
	const methods = useForm<IFormValue>();
	const { setValue } = methods;

	// const { mutate } = useMutation((userParam: { id: string; name: string }) =>
	// 	PatchUserUpdate(userParam.id, userParam.name),
	// );

	const onSumbmitUpdateHandler = data => {
		console.log(data);
		// mutate(data.userUpdateId);
	};

	useEffect(() => {
		if (modaltoggle) {
			setOpen(true);
			/**
			 * input 초기화
			 */
			setValue('userUpdateId', '');
		}
	}, [modaltoggle]);

	const onClickModalClose = useCallback(() => {
		setOpen(false);
		setTimeout(() => {
			setModalToggle(false);
		}, 1000);
	}, [setModalToggle, setOpen]);

	return (
		<>
			{open && <Dim open={open} />}
			<UpdateUserBox open={open}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSumbmitUpdateHandler)}>
						<section className="modal-box">
							<header>
								<p className="title">사용자 수정</p>
								<button
									type="button"
									className="close"
									onClick={onClickModalClose}
								/>
							</header>
							<main className="contents">
								<SectionLable>아이디</SectionLable>
								<p className="email">{userId}</p>
								<InputName
									label={'이름'}
									type={'text'}
									placeholder={'이름을 입력하세요'}
									registerId={'userUpdateId'}
									requireMessage={'이름을 입력하세요'}
								/>
							</main>
							<footer>
								<div className="border"></div>
								<div className="btn-box">
									<ModalButton
										type="button"
										className="btn-cancle"
										btnType={ModalButtonType.CANCLE}
										onClick={onClickModalClose}
									>
										취소
									</ModalButton>
									<ModalButton type="submit" btnType={ModalButtonType.ACTIVE}>
										생성
									</ModalButton>
								</div>
							</footer>
						</section>
					</form>
				</FormProvider>
			</UpdateUserBox>
		</>
	);
}

export default UpdateUserModal;
