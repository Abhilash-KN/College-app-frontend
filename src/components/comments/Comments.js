import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CommentBox from './CommentBox';
import {
	setLoadingStatus,
	setErrorMessage,
	updateLoginStatus,
} from '../../redux';
import styles from '../styles/comments/Comments.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
function Comments(props) {
	const [comments, updateComments] = useState([]);
	const [comment, setComment] = useState('');
	function getComments() {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/comments',
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
					updateComments([...response.data]);
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet conneciton and try again',
					});
				else
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Unknown error occured. Please try again',
					});
				props.setLoadingStatus(false);
			});
	}
	function postComment() {
		props.setLoadingStatus(true);
		var config = {
			method: 'post',
			url: '/api/newcomment',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			data: {
				targetId: props.targetId,
				content: comment,
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
					setComment('');
					getComments();
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
		getComments();
		//eslint-disable-next-line
	}, []);

	return (
		<div className={styles.container}>
			<div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
				{comments.length} Comments
			</div>
			{comments.map((block) => (
				<div className={styles.commentBox}>
					<div className={styles.userIcon}>
						<FontAwesomeIcon icon={faUserCircle} />
					</div>
					<div className={styles.body}>
						<div className={styles.author}>{block.author}</div>
						<div className={styles.date}>{block.date}</div>
						<div className={styles.content}>
							{block.content.split('\n').map((line, i) => (
								<span key={i}>
									{line}
									<br />
								</span>
							))}
						</div>
					</div>
				</div>
			))}
			<hr className={styles.hr} />
			<CommentBox
				targetId={props.targetId}
				setComment={setComment}
				comment={comment}
			/>
			<button className={styles.button} onClick={postComment}>
				Post
			</button>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoadingStatus: (state) => dispatch(setLoadingStatus(state)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
	};
};

export default connect(null, mapDispatchToProps)(Comments);
