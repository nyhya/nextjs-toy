import { getErrorMessage } from 'common/utils/handleException';

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
			<button onClick={() => resetErrorBoundary()}> 다시 시도 </button>
		</div>
	);
}

export default ErrorFallback;
