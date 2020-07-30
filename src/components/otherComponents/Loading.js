import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/otherComponents/Loading.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loading(props) {
	if (props.loading) {
		return (
			<div className={styles.container}>
				<FontAwesomeIcon icon={faSpinner} spin />
			</div>
		);
	}
	return null;
}

const mapStateToProps = (state) => {
	return {
		loading: state.main.loading,
	};
};

export default connect(mapStateToProps, null)(Loading);
