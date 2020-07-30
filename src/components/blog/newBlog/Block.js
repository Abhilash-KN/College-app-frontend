import React from 'react';
import styles from '../../styles/blog/newBlog/Editor.module.css';

function Block(props) {
	function changeHandler(e) {
		let c = [...props.content];
		c[props.index][1] = e.target.value;
		props.updateContent(c);
	}
	if (props.block[0] === 'h2')
		return (
			<div className={styles.heading}>
				<div className={styles.text}>Heading</div>
				<input
					className={styles.input}
					type='text'
					name={props.index}
					onChange={(e) => changeHandler(e)}
					value={props.content[props.index][1]}
					placeholder='Enter the heading here...'
				/>
			</div>
		);
	else if (props.block[0] === 'p')
		return (
			<div className={styles.paragraph}>
				<div className={styles.text}>Paragraph</div>
				<textarea
					className={styles.input}
					type='text'
					name={props.index}
					onChange={(e) => changeHandler(e)}
					value={props.content[props.index][1]}
					placeholder='paragraph...'
				/>
			</div>
		);
	else
		return (
			<div className={styles.link}>
				<div className={styles.text}>Link</div>
				<input
					className={styles.input}
					type='text'
					name={props.index}
					onChange={(e) => changeHandler(e)}
					value={props.content[props.index][1]}
					placeholder='Hyperlink...'
				/>
			</div>
		);
}

export default Block;
