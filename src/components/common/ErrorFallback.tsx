import { ModalButtonType } from 'common/designType';
import { getErrorMessage } from 'common/utils/handleException';
import { ModalButton } from 'components/ui/Button';

function ErrorFallback({ error, resetErrorBoundary }) {
	// const { status } = error.response;
	// const { title, content } = getErrorMessage(status);
	// const isNotAuthorized = status === 401 || status === 403;
	// const buttonMessage = isNotAuthorized ? '로그인' : '새로고침';

	// const onClickHandler = () => {
	// 	if (isNotAuthorized) {
	// 		console.log(isNotAuthorized);

	// 		// navigate('/login');
	// 	} else {
	// 		resetErrorBoundary();
	// 	}
	// };

	return (
		<div>
			<p> ErrorBoundary FallbackComponent 에러: {error.message} </p>
			<ModalButton
				type="button"
				className="btn-cancle"
				btnType={ModalButtonType.ACTIVE}
				onClick={() => resetErrorBoundary()}
			>
				ErrorFallback 컴포넌트 입니다. API 다시 호출 시도 하기
			</ModalButton>
			<button></button>
		</div>
	);
}

export default ErrorFallback;
