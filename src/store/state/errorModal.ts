import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IErrorModalState {
	modaltoggle: boolean;
}

const errorModalState = createSlice({
	name: 'errorModal',
	initialState: {
		modaltoggle: false,
	} as IErrorModalState,
	reducers: {
		rdxOpenModalToggle(state, action: PayloadAction<boolean>) {
			state.modaltoggle = !state.modaltoggle;
		},
	},
});

export default errorModalState;
export const errorModalStateAction = errorModalState.actions;
