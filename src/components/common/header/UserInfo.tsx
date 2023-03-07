import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

const UserBox = styled.li<{ active: boolean }>`
	position: relative;
	height: 60px;
	width: 150px;
	display: inline-block;
	background-color: ${props =>
		props.active ? props.theme['secondary'] : 'transparent'};
	text-align: center;
	line-height: 60px;
	padding: 0px 20px;
	z-index: 1;
	button {
		color: #fff;
	}
`;

const BubbleBox = styled.div`
	position: absolute;
	top: 48px;
	left: 50%;
	transform: translateX(-50%);
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
	padding: 20px 20px;
	.user-name {
		color: ${props => props.theme['textNormal']};
		font-size: 16px;
		line-height: 25px;
	}

	p {
		color: ${props => props.theme['textLight']};
		font-size: 14px;
		line-height: 20px;
	}
`;

function UserInfoBox(): JSX.Element {
	/**
	 * 로그인 된 유저 정보 보여준다.
	 */
	return (
		<BubbleBox>
			<p className="user-name">홍길동</p>
			<p>abc@abc.com</p>
			<p>소속</p>
		</BubbleBox>
	);
}

function UserInfo(): JSX.Element {
	const [active, setActive] = useState(false);

	const onClickActiveUserInfo = useCallback(() => {
		setActive(!active);
	}, [active]);
	return (
		<UserBox active={active}>
			<button onClick={onClickActiveUserInfo}>abc@abc.com</button>
			{active && <UserInfoBox />}
		</UserBox>
	);
}

export default UserInfo;
