import React from 'react';
import styles from '../../styles/question/question/Question.module.css';

function QuestionBody(props) {
	return (
		<div className={styles.content}>
			{props.block.split('\n').map((line, i) => (
				<span key={i}>
					{line}
					<br />
				</span>
			))}
		</div>
	);
}

export default QuestionBody;
