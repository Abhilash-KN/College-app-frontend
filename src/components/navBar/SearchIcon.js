import React from 'react';
import styles from '../styles/navBar/SearchIcon.module.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { openSearchBar, openSideNav } from '../../redux';

function SearchIcon(props) {
	return (
		<div
			className={styles.icon}
			onClick={() => {
				props.openSearchBar(true);
				props.openSideNav(false);
			}}>
			<FontAwesomeIcon icon={faSearch} />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		openSearchBar: (state) => dispatch(openSearchBar(state)),
		openSideNav: (state) => dispatch(openSideNav(state)),
	};
};

export default connect(null, mapDispatchToProps)(SearchIcon);
