import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import styles from '../styles/navBar/SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { openSearchBar } from '../../redux';

function SearchBar(props) {
	return (
		<div
			className={
				props.searchBarOpen
					? styles.searchBarOpen
					: styles.searchBarClose
			}>
			<div
				className={styles.back}
				onClick={() => props.openSearchBar(false)}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.input}>
				<input
					className={styles.inputField}
					placeholder='Search here...'
				/>
				<div
					className={cx(
						styles.searchResults,
						props.searchBarOpen
							? styles.searchResultsOpen
							: styles.searchResultsClose
					)}>
					Search feature is not implemented yet...
				</div>
			</div>
			<div className={styles.search}>
				<FontAwesomeIcon icon={faSearch} />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		searchBarOpen: state.navBar.searchBarOpen,
	};
};

const mapDispatchToProps = (disptach) => {
	return {
		openSearchBar: (state) => disptach(openSearchBar(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
