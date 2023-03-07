import styled from '@emotion/styled';
import { userAuthList } from 'common/options';
import { useCallback, useEffect, useState } from 'react';
import { ISelectType } from 'types/commonType';

const DropDownBox = styled.div`
	position: relative;
	width: 155px;
	height: 35px;
	border-radius: 5px;
	background-color: #fff;
	z-index: 1;
	button {
		width: 100%;
		display: block;
		line-height: 38px;
		text-align: left;
		background: url('/icon/icon-arrow-down.jpg') no-repeat calc(100% - 10px)
				center/18px auto,
			transparent;
		color: ${props => props.theme['primary']};
		font-size: 15px;
		padding-left: 10px;
		cursor: pointer;
	}

	.option-list {
		position: absolute;
		left: 0;
		top: 38px;
		width: 100%;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
		ul {
			display: block !important;
			padding: 10px 0px;
		}
	}
`;

const ActiveItem = styled.li<{ active: boolean }>`
	height: 38px !important;
	background-color: ${props =>
		props.active ? props.theme['secondary'] : 'transparent'};
	line-height: 38px !important;
	display: block !important;
	color: ${props => (props.active ? '#FFF' : '#5a5959')};
	padding: 0px 10px !important;
	cursor: pointer;
	&:hover {
		color: ${props => props.theme['primary']};
	}
`;

interface IDropDownProps {
	onActiveItem: ISelectType;
	onClickActiveItem: (activeItem: ISelectType) => void;
}
function DropDownMenu(props: IDropDownProps): JSX.Element {
	const { onActiveItem, onClickActiveItem } = props;
	const [activeState, setActiveState] = useState(false);
	const [activeMenuItem, setActiveMenuItem] = useState<ISelectType>();

	useEffect(() => {
		if (onActiveItem) {
			setActiveMenuItem(onActiveItem);
		}
	}, [onActiveItem]);

	const onClickMenuActive = useCallback(() => {
		setActiveState(!activeState);
	}, [activeState]);

	const onClickActiveHandler = useCallback((item: ISelectType) => {
		setActiveMenuItem(item);
		onClickActiveItem(item);
		setActiveState(false);
	}, []);

	const onBlurHandler = useCallback(() => {
		setActiveState(false);
	}, []);

	const onMouseDownHandler = useCallback(e => {
		e.preventDefault();
	}, []);

	return (
		<DropDownBox onBlur={onBlurHandler} tabIndex={0}>
			<button onClick={onClickMenuActive}>
				{activeMenuItem ? activeMenuItem?.label : onActiveItem.label}
			</button>
			{activeState && (
				<div className="option-list">
					<ul>
						{userAuthList.map(item => {
							return (
								<ActiveItem
									key={item.idx}
									active={
										activeMenuItem ? activeMenuItem.idx === item.idx : false
									}
									onMouseDown={e => onMouseDownHandler(e)}
									onClick={() => onClickActiveHandler(item)}
								>
									{item.label}
								</ActiveItem>
							);
						})}
					</ul>
				</div>
			)}
		</DropDownBox>
	);
}

export default DropDownMenu;
