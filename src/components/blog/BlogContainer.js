import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Blog from './blog/Blog';
import { useEffect } from 'react';
import NewBlog from './newBlog/NewBlog';
import { connect } from 'react-redux';
import { updateLoginStatus } from '../../redux';
import FormContainer from '../form/FormContainer';
import styles from '../styles/Body.module.css';

function BlogContainer(props) {
	useEffect(() => {
		props.updateLoginStatus(localStorage.getItem('loggedIn') === 'true');
	});
	if (!props.loggedIn) {
		return <FormContainer />;
	} else {
		return (
			<div className={styles.container}>
				<Route exact path='/blogs' component={Home} />
				<Route exact path='/blogs/blog/:blogId' component={Blog} />
				<Route exact path='/blogs/new' component={NewBlog} />
			</div>
		);
	}
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
