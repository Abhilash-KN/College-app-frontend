import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Question from './question/Question';
import NewQuestion from './newQuestion/NewQuestion';
import styles from '../styles/Body.module.css';
import { connect } from 'react-redux';
import { updateLoginStatus } from '../../redux';
import FormContainer from '../form/FormContainer';

function QuestionContainer(props) {
	useEffect(() => {
		props.updateLoginStatus(localStorage.getItem('loggedIn') === 'true');
	});
	if (!props.loggedIn) {
		return <FormContainer />;
	}
	return (
		<div className={styles.container}>
			<Route exact path='/questions' component={Home} />
			<Route
				exact
				path='/questions/question/:questionId'
				component={Question}
			/>
			<Route exact path='/questions/new' component={NewQuestion} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.user.loggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
