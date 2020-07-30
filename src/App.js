import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import BlogContainer from './components/blog/BlogContainer';
import Home from './components/home/Home';
import QuestionContainer from './components/question/QuestionContainer';
import NavBar from './components/navBar/NavBar';
import store from './redux/store';
import Loading from './components/otherComponents/Loading';
import Account from './components/account/Account';
import Message from './components/otherComponents/Message';
import styles from './components/styles/Body.module.css';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavBar />
				<div className={styles.container}>
					<Route exact path='/' component={Home} />
					<Route path='/blogs' component={BlogContainer} />
					<Route path='/questions' component={QuestionContainer} />
					<Route path='/account' component={Account} />
					<Message />
					<Loading />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
