import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getUsesrList } from 'api/user';
import { TextFormatType } from 'common/designType';
import { campaignList, usersList } from 'common/mockUp';
import Layout from 'components/layout/Layout';
import CreateUserModal from 'components/modal/CreateUserModal';
import ErrorModal from 'components/modal/ErrorModal';
import UpdateUserModal from 'components/modal/UpdateUserModal';
import SectionTitle from 'components/table/SectionTitle';
import Table, { IGrideCell } from 'components/table/Table';
import Pagelable from 'components/ui/Pagelable';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IUser } from 'types/users';

const ManagerBox = styled.div`
	/* min-height: 700px; */
	button.create-user {
		padding: 10px 15px 8px 15px;
		border-radius: 5px;
		background-color: ${props => props.theme['primary']};
		color: #fff;
		line-height: 15px;
		margin-bottom: 20px;
	}

	button.temp-error {
		padding: 10px 15px 8px 15px;
		border-radius: 5px;
		background-color: ${props => props.theme['borderNormal']};
		color: #fff;
		line-height: 15px;
		margin-bottom: 20px;
		margin-left: 10px;
	}
`;

const setting = [
	{
		header: '아이디',
		id: 'email',
		element: undefined,
	},
	{
		header: '이름',
		id: 'name',
		element: undefined,
	},
	{
		header: '마지막 로그인 일시',
		id: 'last_login_at',
		element: undefined,
		textFormat: TextFormatType.FORMATTYPE,
	},
	{
		header: '수정 ',
		id: undefined,
		element: UserUpdate,
	},
];

const UserUpdateBox = styled.div`
	.text-btn {
		color: ${props => props.theme['primary']};
		font-size: 12.5px;
	}
`;

/**
 * @component UserUpdate
 * @description 수정버튼 컴포넌트
 */
function UserUpdate<T extends IUser>(props: IGrideCell<T>): JSX.Element {
	const { position, change, data } = props;
	const [mordalOpen, setModalOpen] = useState(false);

	const onClickUserUpdate = () => {
		console.log(position);
		console.log(data);

		setModalOpen(true);
	};
	return (
		<UserUpdateBox>
			<UpdateUserModal
				modaltoggle={mordalOpen}
				setModalToggle={setModalOpen}
				userId={data.email}
			/>
			<p className="text-btn" onClick={onClickUserUpdate}>
				수정
			</p>
		</UserUpdateBox>
	);
}

/**
 * @component userManager
 * @description 사용자 페이지
 */
function userManager(): JSX.Element {
	const [params, setParams] = useState({ page: 1, size: 25 });
	const [open, setOpen] = useState(false);
	const [errorModalOpen, setErrorModalOpen] = useState(false);

	// const { data } = useQuery(
	// 	['getUsesrList', params],
	// 	() => getUsesrList(params.page, params.size),
	// 	{
	// 		onError(err) {
	// 			console.log(err);
	// 		},
	// 	},
	// );

	/**
	 * @function onClickModalOpen
	 * @description 생성버튼 클릭시 모달오픈
	 */
	const onClickModalOpen = () => {
		setOpen(true);
	};

	// const onClickErrorModalOpen = () => {
	// 	setErrorModalOpen(true);
	// };

	/**
	 * @function onClickSelectViewPage
	 * @param select 선택한 페이지 넘버
	 * @description 페이지네이션 선택
	 */
	const onClickSelectViewPage = (select: number) => {
		console.log(select);
		setParams({ ...params, page: select });
	};
	return (
		<Layout>
			<CreateUserModal modaltoggle={open} setModalToggle={setOpen} />
			<ManagerBox>
				<SectionTitle>사용자 관리</SectionTitle>
				<button
					type="button"
					className="create-user"
					onClick={onClickModalOpen}
				>
					생성
				</button>

				<Table<IUser> itemSetting={setting} data={usersList.content} />
				<Pagelable
					limit={10}
					selectPage={params.page}
					pageSclae={params.size}
					totalPage={330}
					onSelect={selected => onClickSelectViewPage(selected)}
				/>
			</ManagerBox>
		</Layout>
	);
}

export default userManager;
