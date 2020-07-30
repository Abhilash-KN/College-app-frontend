import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';

function FormContainer(props) {
	if (props.loginPage) return <Login />;
	else return <Register />;
}

const mapStateToProps = (state) => {
	return {
		loginPage: state.user.loginPage,
	};
};

export default connect(mapStateToProps, null)(FormContainer);
