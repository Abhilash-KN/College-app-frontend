import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Comments from '../../comments/Comments';
import QuestionBody from './QuestionBody';
import Answers from './answer/Answers';
import styles from '../../styles/question/question/Question.module.css';
import {
	setLoadingStatus,
	updateLoginStatus,
	setErrorMessage,
} from '../../../redux';
import { useEffect } from 'react';

function Question(props) {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [date, setDate] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/question',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			params: {
				id: props.match.params.questionId,
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
					localStorage.setItem('loggedIn', false);
					localStorage.setItem('token', null);
				} else {
					setTitle(response.data.title);
					setAuthor(response.data.author);
					setDate(response.data.date);
					setContent(response.data.content);
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
						data: 'Question not found',
					});

				props.setLoadingStatus(false);
			});
		// eslint-disable-next-line
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>
			{<QuestionBody block={content} />}
			<div className={styles.about}>
				<div>{author}</div>
				<div>{date}</div>
			</div>
			<br />
			<div className={styles.comments}>
				<Comments targetId={props.match.params.questionId} />
			</div>
			<Answers targetId={props.match.params.questionId} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoadingStatus: (state) => dispatch(setLoadingStatus(state)),
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(null, mapDispatchToProps)(Question);
