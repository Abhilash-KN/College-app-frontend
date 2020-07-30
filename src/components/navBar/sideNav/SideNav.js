import React from 'react';
import styles from '../../styles/navBar/sideNav/SideNav.module.css';
import { connect } from 'react-redux';
import { openSideNav, displayLoginForm } from '../../../redux';
import { Link } from 'react-router-dom';
import ProfileBar from './ProfileBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faNewspaper,
	faQuestion,
	faInfo,
} from '@fortawesome/free-solid-svg-icons';

function SideNav(props) {
	return (
		<div>
			<div
				className={
					props.sideNavOpen
						? styles.backdropOpen
						: styles.backdropClose
				}
				onClick={() => props.openSideNav(false)}
			/>
			<div
				className={
					props.sideNavOpen
						? styles.containerOpen
						: styles.containerClose
				}>
				<ProfileBar />
				<Link
					from='/'
					to='/'
					onClick={() => {
						props.openSideNav(false);
						props.displayLoginForm(false);
					}}
					className={styles.links}>
					<div className={styles.icons}>
						<FontAwesomeIcon icon={faHome} />
					</div>
					<div className={styles.names}>Home</div>
				</Link>
				<Link
					from='/'
					to='/blogs'
					onClick={() => props.openSideNav(false)}
					className={styles.links}>
					<div className={styles.icons}>
						<FontAwesomeIcon icon={faNewspaper} />
					</div>
					<div className={styles.names}>Blogs</div>
				</Link>
				<Link
					from='/'
					to='/questions'
					onClick={() => props.openSideNav(false)}
					className={styles.links}>
					<div className={styles.icons}>
						<FontAwesomeIcon icon={faQuestion} />
					</div>
					<div className={styles.names}>Discussion</div>
				</Link>
				<div className={styles.filler} />
				<Link
					from='/'
					to='#'
					className={styles.links}
					onClick={() => props.openSideNav(false)}>
					<div className={styles.icons}>
						<FontAwesomeIcon icon={faInfo} />
					</div>
					<div className={styles.names}>About</div>
				</Link>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		sideNavOpen: state.navBar.sideNavOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openSideNav: (state) => dispatch(openSideNav(state)),
		displayLoginForm: (state) => dispatch(displayLoginForm(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
