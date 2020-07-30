import {
	UPDATE_LOGIN_STATUS,
	SET_PAGE,
	DISPLAY_LOGIN_FORM,
} from '../actionTypes';

export const updateLoginStatus = (status) => {
	return {
		type: UPDATE_LOGIN_STATUS,
		payload: status,
	};
};

export const setPage = (loginPage) => {
	return {
		type: SET_PAGE,
		payload: loginPage,
	};
};

export const displayLoginForm = (status) => {
	return {
		type: DISPLAY_LOGIN_FORM,
		payload: status,
	};
};
