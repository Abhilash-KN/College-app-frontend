import React from 'react';
import styles from '../styles/navBar/NavIcon.module.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { openSideNav } from '../../redux';

function NavIcon(props) {
	const icon = props.sideNavOpen ? (
		<FontAwesomeIcon
			icon={faTimes}
			color='#fff'
			onClick={() => props.openSideNav(false)}
		/>
	) : (
		<FontAwesomeIcon
			icon={faBars}
			color='#fff'
			onClick={() => props.openSideNav(true)}
		/>
	);
	return <div className={styles.icon}>{icon}</div>;
}

const mapStateToProps = (state) => {
	return {
		sideNavOpen: state.navBar.sideNavOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		openSideNav: (state) => dispatch(openSideNav(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavIcon);
