import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/question/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
	updateLoginStatus,
	setLoadingStatus,
	setErrorMessage,
} from '../../redux';

import QuestionList from './QuestionList';
import { Link } from 'react-router-dom';

function Home(props) {
	const [n, setN] = useState(0);
	const [questionList, setQuestionList] = useState([]);
	const getQuestionList = () => {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/questionlist',
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
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Authentication failed. Please login again',
					});
					props.updateLoginStatus(false);
					localStorage.setItem('token', null);
					localStorage.setItem('loggedIn', false);
				} else {
					setQuestionList([...questionList, ...response.data]);
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
		getQuestionList();
		return () => {
			setN(0);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Link from='/' to='/questions/new' className={styles.new}>
				New Question
			</Link>
			{questionList.map((details) => (
				<QuestionList key={details.id} details={details} />
			))}
			<div className={styles.more} onClick={getQuestionList}>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
		setLoadingStatus: (state) => dispatch(setLoadingStatus(state)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(null, mapDispatchToProps)(Home);
