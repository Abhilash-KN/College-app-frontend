import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/account/Account.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	updateLoginStatus,
	setErrorMessage,
	setLoadingStatus,
} from '../../redux';

function Account(props) {
	const [usn, setUsn] = useState('');
	const [semester, setSemester] = useState('');
	const [branch, setBranch] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	function updateUser() {
		props.setLoadingStatus(true);
		let config = {
			method: 'put',
			url: '/api/updateuser',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
			params: {
				usn: usn,
				semester: semester,
				branch: branch,
			},
		};
		axios(config)
			.then((response) => {
				if (response.data === 'FAILED') {
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Authentication failed. Please login again',
					});
					props.updateLoginStatus(false);
					localStorage.setItem('loggedIn', false);
					localStorage.setItem('token', null);
				} else {
					props.setErrorMessage({
						status: 'SUCCESS',
						data: 'Updated successfully',
					});
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet connection and try again',
					});
				else {
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Unknown error occured. Please try again',
					});
				}
				props.setLoadingStatus(false);
			});
	}
	useEffect(() => {
		props.setLoadingStatus(true);
		var config = {
			method: 'get',
			url: '/api/myaccount',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token'),
			},
		};
		axios(config)
			.then((response) => {
				if (response.data === 'FAILED') {
					props.setErrorMessage({
						status: 'ERROR',
						data: 'Authentication failed. Please login again',
					});
					props.updateLoginStatus(false);
					localStorage.setItem('loggedIn', false);
					localStorage.setItem('token', null);
				} else {
					setName(response.data.name);
					setEmail(response.data.email);
					setUsn(response.data.usn);
					setSemester(response.data.semester);
					setBranch(response.data.branch);
				}
			})
			.then(() => props.setLoadingStatus(false))
			.catch((error) => {
				if (!error.response)
					props.setErrorMessage({
						status: 'ERROR',
						data:
							'Please check your internet connection and try again',
					});
				else {
					props.setErrorMessage({
						status: 'ERROR',
						data: 'User not found',
					});
				}
				props.setLoadingStatus(false);
			});
		//eslint-disable-next-line
	}, []);

	async function logout() {
		await props.setLoadingStatus(true);
		localStorage.removeItem('loggedIn');
		localStorage.removeItem('token');
		await props.updateLoginStatus(false);
		await props.setLoadingStatus(false);
		props.setErrorMessage({
			status: 'SUCCESS',
			data: 'Logged out successfully',
		});
	}
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<div className={styles.data}>
					<span className={styles.label}>Name: </span>
					<span style={{ border: 'none' }} className={styles.field}>
						{name}
					</span>
				</div>
				<div className={styles.data}>
					<span className={styles.label}>Email: </span>
					<span style={{ border: 'none' }} className={styles.field}>
						{email}
					</span>
				</div>
				<div className={styles.data}>
					<span className={styles.label}>USN: </span>
					<input
						className={styles.field}
						value={usn}
						onChange={(e) => setUsn(e.target.value)}
						placeholder='Enter your USN'
					/>
				</div>
				<div className={styles.data}>
					<span className={styles.label}>Semester: </span>
					<input
						className={styles.field}
						value={semester}
						onChange={(e) => setSemester(e.target.value)}
						placeholder='Enter your semester'
					/>
				</div>
				<div className={styles.data}>
					<span className={styles.label}>Branch: </span>
					<input
						className={styles.field}
						value={branch}
						onChange={(e) => setBranch(e.target.value)}
						placeholder='Enter your branch'
					/>
				</div>
				<div className={styles.buttonContainer}>
					<button onClick={updateUser} className={styles.buttonSave}>
						Save changes
					</button>
					<Link
						from='/'
						to='/'
						onClick={logout}
						className={styles.buttonLogout}>
						Logout
					</Link>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoginStatus: (status) => dispatch(updateLoginStatus(status)),
		setErrorMessage: (message) => dispatch(setErrorMessage(message)),
		setLoadingStatus: (status) => dispatch(setLoadingStatus(status)),
	};
};

export default connect(null, mapDispatchToProps)(Account);
