import React from 'react';
import styles from '../../styles/navBar/sideNav/ProfileBar.module.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import {
	displayLoginForm,
	setPage,
	openSideNav,
	updateLoginStatus,
	setErrorMessage,
} from '../../../redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ProfileBar(props) {
	const [name, setName] = useState('');
	function getName() {
		var config = {
			method: 'get',
			url: '/api/myaccount',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};
		axios(config)
			.then((response) => {
				setName(response.data.name);
			})
			.catch((err) => {
				if (!err.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet connection and try again',
					});
				else {
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Authentication failed! please login again',
					});
					props.updateLoginStatus(false);
					localStorage.setItem('token', null);
					localStorage.setItem('loggedIn', false);
				}
			});
	}
	if (props.loggedIn) {
		getName();
		return (
			<div className={styles.container}>
				<div className={styles.profile}>
					<Link
						from='/'
						to='/account'
						onClick={() => props.openSideNav(false)}>
						<div className={styles.icon}>
							<FontAwesomeIcon icon={faUserCircle} />
						</div>
					</Link>
					<Link
						style={{ textDecoration: 'none' }}
						from='/'
						to='/account'
						onClick={() => props.openSideNav(false)}>
						<div className={styles.name}>{name}</div>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.container}>
				<div
					className={styles.button}
					onClick={() => {
						props.displayLoginForm(true);
						props.setPage(true);
						props.openSideNav(false);
					}}>
					Login
				</div>
				<div
					className={styles.button}
					onClick={() => {
						props.displayLoginForm(true);
						props.setPage(false);
						props.openSideNav(false);
					}}>
					Register
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.user.loggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		displayLoginForm: (status) => dispatch(displayLoginForm(status)),
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
		setPage: (state) => dispatch(setPage(state)),
		openSideNav: (state) => dispatch(openSideNav(state)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBar);
