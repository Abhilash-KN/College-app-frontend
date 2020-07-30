import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import AnswerBlock from './AnswerBlock';
import styles from '../../../styles/question/question/answer/Answer.module.css';
import {
	setLoadingStatus,
	updateLoginStatus,
	setErrorMessage,
} from '../../../../redux';

function Answers(props) {
	const [answerList, setAnswerList] = useState([]);
	const [description, updateDescription] = useState('');
	function getAnswers() {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/answers',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			params: {
				targetId: props.targetId,
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
					setAnswerList([...response.data]);
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet conenction and try again',
					});
				else
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Unknown error occured. Please try again',
					});
				props.setLoadingStatus(false);
			});
	}
	function postAnswer() {
		props.setLoadingStatus(true);
		var config = {
			method: 'post',
			url: '/api/newanswer',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			data: {
				targetId: props.targetId,
				content: description,
				date: new Date().toLocaleDateString(),
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
					updateDescription('');
					getAnswers();
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet conenction and try again',
					});
				else
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Unknown error occured. Please try again',
					});
				props.setLoadingStatus(false);
			});
	}
	useEffect(() => {
		getAnswers();
		//eslint-disable-next-line
	}, []);
	return (
		<div>
			<hr style={{ marginBottom: '24px' }} />
			<div style={{ fontSize: '1.6em', color: '#000362' }}>
				{answerList.length} Answers
			</div>
			{answerList.map((answer, index) => (
				<AnswerBlock key={index} details={answer} i={index} />
			))}
			<div className={styles.description}>
				<textarea
					className={styles.text}
					type='text'
					onChange={(e) => updateDescription(e.target.value)}
					value={description}
					placeholder='Write your Answer here'
				/>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}>
				<button className={styles.button} onClick={postAnswer}>
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

export default connect(null, mapDispatchToProps)(Answers);
