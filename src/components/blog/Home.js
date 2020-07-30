import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from '../styles/blog/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import {
	displayLoginForm,
	updateLoginStatus,
	setLoadingStatus,
	setErrorMessage,
} from '../../redux';

import BlogList from './BlogList';
import { Link } from 'react-router-dom';

function Home(props) {
	const [blogList, setBlogList] = useState([]);
	const [n, setN] = useState(0);
	const getBlogList = () => {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/bloglist',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			params: {
				n: n,
			},
		};
		axios(config)
			.then((response) => {
				if (response.data === 'FAILED') {
					props.updateLoginStatus(false);
					localStorage.setItem('token', null);
					localStorage.setItem('loggedIn', false);
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Authentication failed. Please login again.',
					});
				} else {
					setBlogList([...blogList, ...response.data]);
					setN(n + 10);
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet connection and try again',
					});
				else
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Unknown error occured. Please try again',
					});
				props.setLoadingStatus(false);
			});
	};
	useEffect(() => {
		getBlogList();
		return () => {
			setN(0);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Link from='/' to='/blogs/new' className={styles.new}>
				New Blog
			</Link>
			{blogList.map((details) => (
				<BlogList Key={details.id} details={details} />
			))}
			<div className={styles.more} onClick={getBlogList}>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoadingStatus: (state) => dispatch(setLoadingStatus(state)),
		displayLoginForm: (state) => dispatch(displayLoginForm(state)),
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(null, mapDispatchToProps)(Home);
