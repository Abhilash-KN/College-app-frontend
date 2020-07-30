import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/question/newQuestion/NewQuestion.module.css';
import {
	setLoadingStatus,
	updateLoginStatus,
	setErrorMessage,
} from '../../../redux';
import axios from 'axios';

function NewQuestion(props) {
	const [title, setTitle] = useState('');
	const [content, updateContent] = useState('');

	function postQuestion(e) {
		props.setLoadingStatus(true);
		e.preventDefault();
		var config = {
			method: 'post',
			url: '/api/newquestion',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			data: {
				title: title,
				content: content,
				date: new Date().toLocaleDateString(),
				time: Date.now(),
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
					props.setErrorMessage({
						status: 'SUCCESS',
						data: 'Posted successfully',
					});
					setTitle('');
					updateContent('');
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
				else {
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Question with same title already exists',
					});
				}
				props.setLoadingStatus(false);
			});
	}
	return (
		<div className={styles.question}>
			<input
				className={styles.head}
				type='text'
				placeholder='Enter the question title here...'
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>

			<textarea
				className={styles.content}
				type='text'
				placeholder='Describe your question here...'
				onChange={(e) => updateContent(e.target.value)}
				value={content}
			/>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}>
				<button
					className={styles.button}
					onClick={(e) => postQuestion(e)}>
					Post
				</button>
			</div>
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

export default connect(null, mapDispatchToProps)(NewQuestion);
