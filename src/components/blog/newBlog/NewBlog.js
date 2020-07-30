import React from 'react';
import Editor from './Editor';
import Preview from './Preview';
import { useState } from 'react';
import styles from '../../styles/blog/newBlog/NewBlog.module.css';

function NewBlog(props) {
	const [editor, toggleEditor] = useState(true);
	const [title, setTitle] = useState('');
	const [content, updateContent] = useState([]);
	return (
		<div className={styles.container}>
			<div className={styles.options}>
				<div
					className={editor ? styles.selected : styles.unselected}
					onClick={() => toggleEditor(true)}>
					EDITOR
				</div>
				<div
					className={editor ? styles.unselected : styles.selected}
					onClick={() => toggleEditor(false)}>
					PREVIEW
				</div>
			</div>
			<div className={editor ? styles.open : styles.close}>
				<Editor
					style={{ width: '50%' }}
					title={title}
					content={content}
					setTitle={setTitle}
					updateContent={updateContent}
				/>
				<Preview
					style={{ width: '50%' }}
					title={title}
					content={content}
					setTitle={setTitle}
					updateContent={updateContent}
				/>
			</div>
		</div>
	);
}

export default NewBlog;
