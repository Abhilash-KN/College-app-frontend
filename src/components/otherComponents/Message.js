import React from 'react';
import styles from '../styles/otherComponents/Message.module.css';
import { connect } from 'react-redux';
import { setErrorMessage } from '../../redux';

function Message(props) {
	if (!props.message) return null;
	else {
		setTimeout(() => props.setErrorMessage(null), 3000);
		return (
			<div
				className={styles.container}
				style={
					props.message.status === 'ERROR'
						? { background: '#ff2600' }
						: { background: '#00a500' }
				}>
				<div className={styles.message}>{props.message.data}</div>
				<div
					className={styles.button}
					onClick={() => props.setErrorMessage('')}>
					&#10006;
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		message: state.main.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
