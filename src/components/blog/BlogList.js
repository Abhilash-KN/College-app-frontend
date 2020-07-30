import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/blog/Home.module.css';
import thumbNail from '../../resources/blogIcon.jpg';

function BlogList(props) {
	return (
		<div className={styles.links}>
			<Link
				to={`/blogs/blog/${props.details.id}`}
				className={styles.blog}>
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

export default BlogList;
