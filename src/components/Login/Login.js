import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormContainer, FormTitle, FormBody, Input, SubmitBtn } from '../Form';
import { loginUser } from '../../actions/auth';
import BackBtn from '../Buttons/BackBtn';

class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errors: {}
		}
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.loginUser(user, this.props.history)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	render() {
		const { errors } = this.state;
		return (
	    	<div className="w-100 flex flex-column justify-center align-center" style={{ minHeight: '100%' }}>
	    		<FormContainer>
	        		<FormTitle title="Sign in" />
					<FormBody submit={this.handleSubmit}>
						<Input 
						inputType="email"
						inputText="Email..."
						inputName="email"
						change={this.handleInputChange}
						inputValue={this.state.email}
						/>
						{errors.email && (<small className="f6 black-60 db tc">
					      {errors.email}
					    </small>)}
						<Input 
						inputType="password"
						inputText="Password..."
						inputName="password"
						change={this.handleInputChange}
						inputValue={this.state.password}
						/>
						{errors.password && (<small className="f6 black-60 db tc">
					      {errors.password}
					    </small>)}
						<SubmitBtn button="Sign in" />
					</FormBody>
	        	</FormContainer>
				<BackBtn />
	    	</div>
	    );
	}
};

Login.displayName = 'Login';

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));