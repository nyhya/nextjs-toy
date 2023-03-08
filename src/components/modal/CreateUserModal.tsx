import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
	inputIconType,
	InputPatternType,
	ModalButtonType,
} from 'common/designType';
import { ModalButton } from 'components/ui/Button';
import InputEmail from 'components/ui/input/InputEmail';
import InputPassword from 'components/ui/input/InputPassword';
import InputPasswordConfirm from 'components/ui/input/InputPasswordConfirm';
import InputName from 'components/ui/input/InputName';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import Dim from './Dim';
import { useMutation } from '@tanstack/react-query';
import { IUserRequestParam } from 'types/users';

const CreateUserModalBox = styled.div<{ open: boolean | undefined }>`
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
	userId: string;
	userName: string;
	userPassword: string;
	userPasswordConfirm: string;
}

interface ICreateUserModalProps {
	modaltoggle: boolean;
	setModalToggle: Dispatch<SetStateAction<boolean>>;
}

function CreateUserModal(props: ICreateUserModalProps): JSX.Element {
	const { modaltoggle, setModalToggle } = props;
	const [open, setOpen] = useState<boolean>();
	const methods = useForm<IFormValue>();
	const { setValue } = methods;

	// const { mutate } = useMutation((userParam: IUserRequestParam) =>
	// 	PostUserCreate(userParam),
	// );

	useEffect(() => {
		if (modaltoggle) {
			/**
			 * 모달 오픈
			 */
			setOpen(true);
			/**
			 * input 초기화
			 */
			setValue('userId', '');
			setValue('userName', '');
			setValue('userPassword', '');
			setValue('userPasswordConfirm', '');
		}
	}, [modaltoggle]);

	const onClickModalClose = useCallback(() => {
		setOpen(false);
		setTimeout(() => {
			setModalToggle(false);
		}, 1000);
	}, [setModalToggle, setOpen]);

	const onSumbmitCreateHandler = data => {
		const users: IUserRequestParam = {
			name: data.name,
			email: data.email,
			password: data.password,
			repeat_password: data.react_password,
		};
		// mutate(users);
	};

	return (
		<>
			{open && <Dim open={open} />}
			<CreateUserModalBox open={open}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSumbmitCreateHandler)}>
						<section className="modal-box">
							<header>
								<p className="title">사용자 생성</p>
								<button
									type="button"
									className="close"
									onClick={onClickModalClose}
								/>
							</header>
							<main className="contents">
								<InputEmail
									label={'아이디'}
									type={'text'}
									placeholder={'아이디를 입력해 주세요'}
									registerId={'userId'}
									requireMessage={'아이디(이메일)을 입력하세요'}
								/>
								<InputPassword
									label={'비밀번호'}
									type={'password'}
									placeholder={'영문, 숫자, 특수문자 조합 8~15자'}
									registerId={'userPassword'}
									requireMessage={'비밀번호를 입력하세요'}
								/>
								<InputPasswordConfirm
									label={'비밀번호 확인'}
									type={'password'}
									placeholder={'비밀번호를 입력하세요'}
									registerId={'userPasswordConfirm'}
									requireMessage={'비밀번호를 입력하세요'}
								/>
								<InputName
									label={'이름'}
									type={'text'}
									placeholder={'이름을 입력하세요'}
									registerId={'userName'}
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
									<ModalButton
										type="submit"
										btnType={ModalButtonType.ACTIVE}
										// disabled={methods.isSubmitting}
									>
										생성
									</ModalButton>
								</div>
							</footer>
						</section>
					</form>
				</FormProvider>
			</CreateUserModalBox>
		</>
	);
}

export default CreateUserModal;
