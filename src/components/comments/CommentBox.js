import React from 'react';
import styles from '../styles/comments/Comments.module.css';

function CommentBox(props) {
	return (
		<div>
			<textarea
				type='text'
				placeholder='Enter your comment'
				onChange={(e) => props.setComment(e.target.value)}
				value={props.comment}
				className={styles.textarea}
			/>
		</div>
	);
}

export default CommentBox;
