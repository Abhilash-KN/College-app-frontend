import React from 'react';
import styles from '../../styles/blog/blog/Blog.module.css';

function BlogBody(props) {
	return props.block[0] === 'h2' ? (
		<div className={styles.heading}>{props.block[1]}</div>
	) : props.block[0] === 'p' ? (
		<div className={styles.paragraph}>
			{props.block[1].split('\n').map((line, i) => (
				<span key={i}>
					{line}
					<br />
				</span>
			))}
		</div>
	) : (
		<a className={styles.link} href={props.block[1]} target='blank'>
			{props.block[1]}
		</a>
	);
}

export default BlogBody;
