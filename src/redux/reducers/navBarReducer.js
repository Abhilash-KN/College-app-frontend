import { OPEN_SIDENAV, OPEN_SEARCH_BAR } from '../actions/actionTypes';

const initialState = {
	sideNavOpen: false,
	searchBarOpen: false,
};

const navBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_SIDENAV:
			return {
				...state,
				sideNavOpen: action.payload,
			};
		case OPEN_SEARCH_BAR:
			return {
				...state,
				searchBarOpen: action.payload,
			};
		default:
			return state;
	}
};

export default navBarReducer;
