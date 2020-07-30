import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/form/Form.module.css';
import { setPage, setLoadingStatus, setErrorMessage } from '../../redux';
import axios from 'axios';

function Register(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');

	const [nameIsValid, validateName] = useState(false);
	const [emailIsValid, validateEmail] = useState(false);
	const [passwordIsValid, validatePassword] = useState(false);
	const [passwordsMatches, comparePasswords] = useState(false);

	const nameRe = /^[a-zA-Z ]+$/;
	const emailRe = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const passwordRe = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{4,}$/;

	function onSubmit(e) {
		e.preventDefault();
		props.setLoadingStatus(true);
		var config = {
			method: 'post',
			url: '/api/register',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				name: name,
				email: email,
				password: password,
			},
		};
		axios(config)
			.then((response) => {
				props.setErrorMessage({
					status: 'SUCCESS',
					data: 'Successfully registered',
				});
				props.setPage(true);
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
						data: 'Email already registered',
					});
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
				validatePassword(passwordRe.test(e.target.value));
				comparePasswords(password === e.target.value);
				break;
			case 'repassword':
				setRePassword(e.target.value);
				comparePasswords(password === e.target.value);
				break;
			case 'name':
				setName(e.target.value);
				validateName(nameRe.test(e.target.value));
				break;
			default:
				break;
		}
	}
	return (
		<form
			onSubmit={onSubmit}
			className={styles.container}
			style={{ minHeight: '360px' }}>
			<input
				type='text'
				name='name'
				placeholder='Full Name'
				onChange={(e) => changeHandler(e)}
				value={name}
				className={
					!nameIsValid && name.length > 0
						? styles.invalid
						: styles.field
				}></input>
			{!nameIsValid && name.length > 0 ? (
				<div className={styles.errorMessage}>
					Only letters and whitespaces allowed
				</div>
			) : null}
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
				className={
					!passwordIsValid && password.length > 0
						? styles.invalid
						: styles.field
				}></input>
			{!passwordIsValid && password.length > 0 ? (
				<div
					className={styles.errorMessage}
					style={{ minHeight: '76px' }}>
					password must contain atleast
					<div
						style={password.length > 3 ? { color: 'green' } : null}>
						&#8226; 4 characters
					</div>
					<div
						style={
							/[a-zA-z]+/.test(password)
								? { color: 'green' }
								: null
						}>
						&#8226; 1 letter (a-z or A-Z)
					</div>
					<div
						style={
							/[0-9]+/.test(password) ? { color: 'green' } : null
						}>
						&#8226; 1 number (0-9)
					</div>
					<div
						style={
							/[!@#$%^&*]+/.test(password)
								? { color: 'green' }
								: null
						}>
						&#8226; 1 special character (!@#$%^&*)
					</div>
				</div>
			) : null}
			<input
				type='password'
				name='repassword'
				placeholder='Re Enter Password'
				onChange={(e) => changeHandler(e)}
				value={rePassword}
				className={
					!passwordsMatches && rePassword > 0
						? styles.invalid
						: styles.field
				}></input>
			{!passwordsMatches && rePassword.length > 0 ? (
				<div className={styles.errorMessage}>
					passwords must be same
				</div>
			) : null}
			<button
				type='submit'
				className={
					nameIsValid &&
					emailIsValid &&
					passwordIsValid &&
					passwordsMatches
						? styles.button
						: styles.disabled
				}
				disabled={
					!(
						nameIsValid &&
						emailIsValid &&
						passwordIsValid &&
						passwordsMatches
					)
				}>
				Register
			</button>
			<div className={styles.link} onClick={() => props.setPage(true)}>
				Existing user? Login here
			</div>
		</form>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		setPage: (loginPage) => dispatch(setPage(loginPage)),
		setLoadingStatus: (state) => dispatch(setLoadingStatus(state)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
	};
};

export default connect(null, mapDispatchToProps)(Register);
