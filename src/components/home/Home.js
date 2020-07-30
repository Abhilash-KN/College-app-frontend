import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../styles/home/Home.module.css';
import homeImage from '../../resources/homePage.jpg';
import blogImage from '../../resources/blog.jpg';
import questionImage from '../../resources/questions.jpg';
import FormContainer from '../form/FormContainer';

function Home(props) {
	if (props.loginForm) return <FormContainer />;
	return (
		<div>
			<div className={styles.imageContainer}>
				<img className={styles.image} src={homeImage} alt='' />
				<div className={styles.mask}>
					<div style={{ fontSize: '12vw', marginBottom: '4%' }}>
						Welcome!
					</div>
					<div className={styles.text}>
						Ask a quesiton or write a blog! <br />
						Stay connected with everyone in your college
					</div>
				</div>
			</div>

			<div className={styles.links}>
				<div className={styles.info}>
					Explore the blogs <br />
					written by your peers or <br />
					write your own blog
				</div>
				<Link from='/' to='/blogs' className={styles.link}>
					<img className={styles.thumbNail} src={blogImage} alt='' />
					<div className={styles.text}>Blog</div>
				</Link>
				<Link from='/' to='/blogs/new' className={styles.new}>
					New Blog
				</Link>
				<div className={styles.info}>
					Ask a question and <br />
					Get your doubts cleared <br />
					or answer an already <br />
					existing question
				</div>
				<Link from='/' to='/questions' className={styles.link}>
					<img
						className={styles.thumbNail}
						src={questionImage}
						alt=''
					/>
					<div className={styles.text}>Discussion</div>
				</Link>
				<Link from='/' to='/questions/new' className={styles.new}>
					New Question
				</Link>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loginForm: state.user.loginForm,
	};
};

export default connect(mapStateToProps, null)(Home);
