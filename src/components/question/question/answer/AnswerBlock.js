import React from 'react';
import Comments from '../../../comments/Comments';
import styles from '../../../styles/question/question/Question.module.css';

function AnswerBlock(props) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{props.details.content.split('\n').map((line, i) => (
					<span>
						{line}
						<br />
					</span>
				))}
			</div>
			<div className={styles.about}>
				<div>{props.details.author}</div>
				<div>{props.details.date}</div>
			</div>
			<div className={styles.comments}>
				<Comments targetId={props.details.id} index={props.i} />
			</div>
			<hr />
		</div>
	);
}

export default AnswerBlock;
