const {
	UPDATE_LOGIN_STATUS,
	SET_PAGE,
	DISPLAY_LOGIN_FORM,
} = require('../actions/actionTypes');

const initialState = {
	loggedIn: localStorage.getItem('loggedIn') === 'true',
	email: '',
	password: '',
	rePassword: '',
	name: '',
	loginPage: true,
	loginForm: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_LOGIN_STATUS:
			return {
				...state,
				loggedIn: action.payload,
			};
		case SET_PAGE:
			return {
				...state,
				loginPage: action.payload,
			};
		case DISPLAY_LOGIN_FORM:
			return {
				...state,
				loginForm: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
