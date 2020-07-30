import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/userReducer';
import mainReducer from './reducers/mainReducer';
import navBarReducer from './reducers/navBarReducer';

const rootReducer = combineReducers({
	user: userReducer,
	main: mainReducer,
	navBar: navBarReducer,
});

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
