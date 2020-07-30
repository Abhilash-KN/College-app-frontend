import React from 'react';
import styles from '../styles/navBar/NavBar.module.css';
import SearchIcon from './SearchIcon';
import NavIcon from './NavIcon';
import SearchBar from './SearchBar';
import SideNav from './sideNav/SideNav';

function NavBar() {
	return (
		<div className={styles.container}>
			<NavIcon />
			<div className={styles.name}>EPCET</div>
			<SearchIcon />
			<SearchBar />
			<SideNav />
		</div>
	);
}

export default NavBar;
