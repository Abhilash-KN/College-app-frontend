import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Comments from '../../comments/Comments';
import styles from '../../styles/blog/blog/Blog.module.css';
import axios from 'axios';
import {
	setLoadingStatus,
	updateLoginStatus,
	setErrorMessage,
} from '../../../redux';
import BlogBody from './BlogBody';

function Blog(props) {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [date, setDate] = useState('');
	const [content, setContent] = useState([]);

	useEffect(() => {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/blog',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			params: {
				id: props.match.params.blogId,
			},
		};
		axios(config)
			.then((response) => {
				if (response.data === 'FAILED') {
					localStorage.setItem('token', null);
					localStorage.setItem('loggedIn', false);
					props.updateLoginStatus(false);
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Authentication failed. Please login again.',
					});
				} else {
					setTitle(response.data.title);
					setAuthor(response.data.author);
					setDate(response.data.date);
					setContent([...response.data.content]);
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet connection and try again.',
					});
				else
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Blog not found',
					});

				props.setLoadingStatus(false);
			});
		// eslint-disable-next-line
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>
			{content.map((block, index) => (
				<BlogBody key={index} block={block} />
			))}
			<div className={styles.about}>
				<div>{author}</div>
				<div>{date}</div>
			</div>
			<Comments targetId={props.match.params.blogId} />
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

export default connect(null, mapDispatchToProps)(Blog);
