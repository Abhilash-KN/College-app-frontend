import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import styles from '../styles/form/Form.module.css';
import {
	setPage,
	updateLoginStatus,
	setLoadingStatus,
	setErrorMessage,
	displayLoginForm,
} from '../../redux';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailIsValid, validateEmail] = useState(false);
	const emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	function onSubmit(e) {
		e.preventDefault();
		props.setLoadingStatus(true);
		var config = {
			method: 'post',
			url: '/api/signin',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				email: email,
				password: password,
			},
		};
		axios(config)
			.then((response) => {
				console.log('reached');
				localStorage.setItem('loggedIn', response.data.loggedIn);
				console.log('reached 1');
				localStorage.setItem('token', response.data.token);
				console.log('reached 2');
				props.updateLoginStatus(response.data.loggedIn);
				console.log('reached 3');
				props.displayLoginForm(false);
				console.log('reached 4');
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet connection and try again',
					});
				else
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Invalid email or password',
					});
				localStorage.setItem('loggedIn', false);
				localStorage.setItem('token', null);
				props.updateLoginStatus(false);
				props.setLoadingStatus(false);
			});
	}
	function changeHandler(e) {
		switch (e.target.name) {
			case 'email':
				setEmail(e.target.value);
				validateEmail(emailRe.test(e.target.value));
				break;
			case 'password':
				setPassword(e.target.value);
				break;
			default:
				break;
		}
	}

	return (
		<form
			onSubmit={onSubmit}
			className={styles.container}
			style={{ minHeight: '240px' }}>
			<input
				type='email'
				name='email'
				placeholder='Email'
				onChange={(e) => changeHandler(e)}
				value={email}
				className={
					!emailIsValid && email.length > 0
						? styles.invalid
						: styles.field
				}></input>
			{!emailIsValid && email.length > 0 ? (
				<div className={styles.errorMessage}>email is not valid</div>
			) : null}
			<input
				type='password'
				name='password'
				placeholder='Password'
				onChange={(e) => changeHandler(e)}
				value={password}
				className={styles.field}></input>
			<button
				type='submit'
				className={emailIsValid ? styles.button : styles.disabled}
				disabled={!emailIsValid}>
				Login
			</button>
			<div className={styles.link} onClick={() => props.setPage(false)}>
				New user? Register here
			</div>
		</form>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setPage: (loginPage) => dispatch(setPage(loginPage)),
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
		setLoadingStatus: (state) => dispatch(setLoadingStatus(state)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
		displayLoginForm: (status) => dispatch(displayLoginForm(status)),
	};
};

export default connect(null, mapDispatchToProps)(Login);
