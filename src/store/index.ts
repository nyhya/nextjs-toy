/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from 'react-redux';
import { Action, combineReducers } from 'redux';
import errorModalState from './state/errorModal';
import userState from './state/user';

const rootReducer = combineReducers({
	userState: userState.reducer,
	errorModalState: errorModalState.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		if (state === initialRootState) {
			return {
				...state,
				...action.payload,
			};
		}
		return state;
	}
	return rootReducer(state, action);
};

export const userSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = () => {
	const store = configureStore({
		reducer,
		devTools: true,
		// debug: process.env.NODE_ENV === 'development',
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: { extraArgument: { store: () => store } },
				serializableCheck: false,
			}).concat(),
	});

	initialRootState = store.getState();
	return store;
};
// export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(initStore);
// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	RootState,
// 	unknown,
// 	Action<string>
// >;
