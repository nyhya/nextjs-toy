import styled from '@emotion/styled';
import { routerPath, userAuthList } from 'common/options';
import DropDownMenu from 'components/ui/DropDownMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { RootState, userSelector } from 'store';
import { userStateAction } from 'store/state/user';
import { ISelectType } from 'types/commonType';
import UserInfo from './UserInfo';

const HeaderBox = styled.header`
	width: 100%;
	height: 60px;

	background-color: ${props => props.theme['primary']};
	.inner-box {
		position: relative;
		width: 1024px;
		margin: 0 auto;
		.logo {
			position: absolute;
			left: 0;
			top: 0;
			height: 60px;
			line-height: 60px;
			padding-right: 20px;
			cursor: pointer;
		}
		.header-inner-box {
			height: 60px;
			display: flex;
			flex: 1;
			justify-content: space-between;

			.menu {
				ul {
					/* li {
					height: 60px;
					display: inline-block;
					line-height: 60px;
					padding: 0px 20px;
					cursor: pointer;
				} */
				}
			}

			.personal-box {
				ul {
					display: flex;
					justify-content: flex-end;
					/* li {
					display: inline-block;
					height: 60px;
					line-height: 60px;
					padding: 0px 20px;
				} */

					.authority {
						display: flex;
						align-items: center;
						padding-left: 20px;
					}
				}
			}
		}
	}
`;

const NavMenuItem = styled.li<{ active: boolean; isShow: boolean }>`
	height: 60px;
	display: ${props => (props.isShow ? 'inline-block' : 'none')};
	background-color: ${props =>
		props.active ? props.theme['secondary'] : 'transparent'};
	line-height: 60px;
	padding: 0px 20px;
	cursor: pointer;
`;

export default function Header(): JSX.Element {
	const { pathname, push } = useRouter();
	const dispatch = useDispatch();
	const { userAuth } = userSelector((state: RootState) => state.userState);

	/**
	 * @function authUserChange
	 * @param userAuth
	 * @description 권한설정
	 */
	const authUserChange = (userAuth: ISelectType) => {
		if (
			pathname === '/userManager' &&
			userAuth &&
			userAuth.label !== '어드민'
		) {
			push('/');
		}
		dispatch(userStateAction.rdxSetUserAuth(userAuth));
	};

	return (
		<HeaderBox>
			<div className="inner-box">
				{/* <div className="logo">HOME</div> */}
				<div className="header-inner-box">
					<div className="menu">
						<ul>
							{routerPath.map(item => {
								const isActive = pathname === item.value;
								return (
									<Link href={item.value.toString()} key={item.idx}>
										<NavMenuItem
											active={isActive}
											isShow={
												item.label !== '사용자' ||
												(userAuth && userAuth.label === '어드민')
											}
										>
											{item.label}
										</NavMenuItem>
									</Link>
								);
							})}
						</ul>
					</div>
					<div className="personal-box">
						<ul>
							<UserInfo />
							<li className="authority">
								<DropDownMenu
									onClickActiveItem={authUserChange}
									onActiveItem={userAuth}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</HeaderBox>
	);
}
