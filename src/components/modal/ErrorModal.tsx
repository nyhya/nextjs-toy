import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ModalButtonType } from 'common/designType';
import { ModalButton } from 'components/ui/Button';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import Dim from './Dim';

const ErrorModalBox = styled.div<{ open: boolean | undefined }>`
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
			p {
				color: ${props => props.theme['textLight']};
				text-align: left;
				padding: 5px 0px;
				font-size: 15px;
				line-height: 22px;
				margin-bottom: 20px;
				font-weight: 400;

				b {
					color: ${props => props.theme['textNormal']};
					font-weight: 400;
				}
			}
		}
		footer {
			width: 100%;
			display: flex;
			justify-content: flex-end;
			flex-direction: column;
			background-color: #fff;
			padding-bottom: 30px;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 0px 30px 20px 30px;

			.border {
				width: calc(100% - 60px);
				height: 1px;
				border-top: 1px solid ${props => props.theme['borderNormal']};
				margin: 0 auto;
			}

			.btn-box {
				display: flex;
				justify-content: flex-end;
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

interface IErrorModalProps {
	modaltoggle: boolean;
	setModalToggle: Dispatch<SetStateAction<boolean>>;
}
function ErrorModal(props: IErrorModalProps): JSX.Element {
	const { modaltoggle, setModalToggle } = props;
	const [open, setOpen] = useState<boolean>();

	useEffect(() => {
		if (modaltoggle) {
			setOpen(true);
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
			<ErrorModalBox open={open}>
				<section className="modal-box">
					<header></header>
					<main className="contents">
						<p>
							<b>에러가 발생했습니다.</b> <br />
							같은 현상이 반복되면 고객센터로 문의 드립니다.
						</p>
						<p>
							<b>고객센터</b> <br />- Email : help@hanmail.ai
						</p>
					</main>
					<footer>
						<div className="btn-box">
							<ModalButton
								type="button"
								btnType={ModalButtonType.ACTIVE}
								onClick={onClickModalClose}
							>
								확인
							</ModalButton>
						</div>
					</footer>
				</section>
			</ErrorModalBox>
		</>
	);
}

export default ErrorModal;
