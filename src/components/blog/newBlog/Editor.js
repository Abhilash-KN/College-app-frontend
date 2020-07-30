import React from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import styles from '../../styles/blog/newBlog/Editor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faParagraph,
	faHeading,
	faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
	setLoadingStatus,
	setErrorMessage,
	updateLoginStatus,
} from '../../../redux';
import axios from 'axios';

function Editor(props) {
	const blocks = props.content.map((block, index) => (
		<Block
			key={index}
			block={block}
			index={index}
			content={props.content}
			updateContent={props.updateContent}
		/>
	));

	function postBlog(e) {
		e.preventDefault();
		props.setLoadingStatus(true);
		var config = {
			method: 'post',
			url: '/api/newblog',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			data: {
				title: props.title,
				content: props.content,
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
					props.setTitle('');
					props.updateContent([]);
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
						data: 'Title already exists',
					});
				}
				props.setLoadingStatus(false);
			});
	}
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.text}>Title</div>
				<input
					className={styles.input}
					type='text'
					placeholder='Enter the blog title here'
					onChange={(e) => props.setTitle(e.target.value)}
					value={props.title}
				/>
			</div>
			{blocks}
			<div className={styles.insert}>
				<div
					className={styles.add}
					onClick={() =>
						props.updateContent([...props.content, ['h2', '']])
					}>
					<FontAwesomeIcon icon={faHeading} fontSize='1.6em' />
					<div style={{ fontSize: '0.6em' }}>Heading</div>
				</div>
				<div
					className={styles.add}
					onClick={() =>
						props.updateContent([...props.content, ['p', '']])
					}>
					<FontAwesomeIcon icon={faParagraph} fontSize='1.6em' />
					<div style={{ fontSize: '0.6em' }}>Paragraph</div>
				</div>
				<div
					className={styles.add}
					onClick={() =>
						props.updateContent([...props.content, ['a', '']])
					}>
					<FontAwesomeIcon icon={faLink} fontSize='1.6em' />
					<div style={{ fontSize: '0.6em' }}>Link</div>
				</div>
			</div>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}>
				<button className={styles.button} onClick={(e) => postBlog(e)}>
					Post
				</button>
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

export default connect(null, mapDispatchToProps)(Editor);
