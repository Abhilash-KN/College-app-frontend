import { SET_LOADING_STATUS, SET_ERROR_MESSAGE } from '../actionTypes';

export const setLoadingStatus = (status) => {
	return {
		type: SET_LOADING_STATUS,
		payload: status,
	};
};

export const setErrorMessage = (message) => {
	return {
		type: SET_ERROR_MESSAGE,
		payload: message,
	};
};
