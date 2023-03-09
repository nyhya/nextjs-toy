import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelectType } from 'types/commonType';

interface IUserState {
	userId: string;
	userName: string;
	userEmail: string;
	userCompany: string;
	userCompanyId: string;
	userCompanyName: string;
	userAuth: ISelectType;
}

const userState = createSlice({
	name: 'userAuth',
	initialState: {
		userAuth: {
			idx: 1,
			value: '어드민',
			label: '어드민',
		},
	} as IUserState,
	reducers: {
		rdxSetUserAuth(state, action: PayloadAction<ISelectType>) {
			state.userAuth = action.payload;
		},
	},
});

export default userState;
export const userStateAction = userState.actions;
