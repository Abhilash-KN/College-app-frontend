import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/question/Home.module.css';
import thumbNail from '../../resources/questionMark.png';

function QuestionList(props) {
	return (
		<div className={styles.links}>
			<Link
				to={`/questions/question/${props.details.id}`}
				className={styles.question}>
				<img className={styles.thumbNail} src={thumbNail} alt='' />
				<div className={styles.details}>
					<div className={styles.title}>{props.details.title}</div>
					<div style={{ flexGrow: '1' }} />
					<div className={styles.author}>{props.details.author}</div>
					<div className={styles.date}>{props.details.date}</div>
				</div>
			</Link>
		</div>
	);
}

export default QuestionList;
