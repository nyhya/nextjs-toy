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
		<div className="error-fallback-wrapper">
			에러 났어요
			{/* <div className="inner">
				<h2 className="title">{title}</h2>
				<p className="content">{content}</p>
				<button type="button" onClick={onClickHandler}>
					{buttonMessage}
				</button>
			</div> */}
		</div>
	);
}

export default ErrorFallback;
