import styled from '@emotion/styled';
import React from 'react';

const DimBox = styled.div<{ open: boolean }>`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	display: ${props => (props.open ? 'flex' : 'none')};
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 100000;

	animation: ${props => (props.open ? 'modal-bg-show' : 'modal-bg-close')} 0.1s;

	@keyframes modal-bg-show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes modal-bg-close {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
`;

interface IDimProps {
	open: boolean;
}
function Dim(props: IDimProps): JSX.Element {
	const { open } = props;

	return <DimBox open={open} />;
}

export default React.memo(Dim);
