const {
	SET_LOADING_STATUS,
	SET_ERROR_MESSAGE,
} = require('../actions/actionTypes');

const initialState = {
	loading: false,
	message: null,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOADING_STATUS:
			return {
				...state,
				loading: action.payload,
			};
		case SET_ERROR_MESSAGE:
			return {
				...state,
				message: action.payload,
			};
		default:
			return { ...state };
	}
};

export default mainReducer;
