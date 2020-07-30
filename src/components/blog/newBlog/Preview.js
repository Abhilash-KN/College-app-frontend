import React from 'react';
import styles from '../../styles/blog/blog/Blog.module.css';

function Preview(props) {
	const content = props.content.map((block, index) => (
		<div key={index}>
			{block[0] === 'h2' ? (
				<div className={styles.heading}>{block[1]}</div>
			) : block[0] === 'p' ? (
				<div className={styles.paragraph}>
					{block[1].split('\n').map((line, i) => (
						<span key={i}>
							{line}
							<br />
						</span>
					))}
				</div>
			) : (
				<div className={styles.linkContainer}>
					<a className={styles.link} href={block[1]} target='blank'>
						{block[1]}
					</a>
				</div>
			)}
		</div>
	));
	return (
		<div className={styles.container}>
			<div className={styles.title}>{props.title}</div>
			{content}
		</div>
	);
}

export default Preview;
