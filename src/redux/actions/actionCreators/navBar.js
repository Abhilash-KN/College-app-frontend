import { OPEN_SIDENAV, OPEN_SEARCH_BAR } from '../actionTypes';

export const openSideNav = (state) => {
	return {
		type: OPEN_SIDENAV,
		payload: state,
	};
};

export const openSearchBar = (state) => {
	return {
		type: OPEN_SEARCH_BAR,
		payload: state,
	};
};
