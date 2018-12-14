// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { registerUser } from '../../actions';

// COMPONENTS
import { FormContainer, FormTitle, FormBody, Input, SubmitBtn, BackBtn } from '../../components';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		}
	}

	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { username, email, password, password2 } = this.state;
		const { registerUser, history } = this.props;
		const user = {
			username,
			email,
			password,
			password2
		}
		registerUser(user, history);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	componentDidMount() {
		const { history, auth } = this.props;
		if(auth.isAuthenticated) {
            history.push('/dashboard');
        }
	}

	render() {
		const { errors, username, email, password, password2 } = this.state;
		return (
			<Fragment>
				<div className="w-100 relative">
					<BackBtn />
				</div>
		        <div className="w-100 flex flex-column justify-center align-center mb3" style={{ minHeight: '100vh' }}>
		    		<FormContainer>
		        		<FormTitle title="Sign up" />
						<FormBody submit={this.handleSubmit}>
							<Input 
							inputType="text"
							inputText="Username..."
							inputName="username"
							change={this.handleInputChange}
							inputValue={username}
							/>
							{errors.username && (<small className="f6 black-60 db tc">
						      {errors.username}
						    </small>)}
							<Input 
							inputType="email"
							inputText="Email..."
							inputName="email"
							change={this.handleInputChange}
							inputValue={email}
							/>
							{errors.email && (<small className="f6 black-60 db tc">
						      {errors.email}
						    </small>)}
							<Input 
							inputType="password"
							inputText="Password..."
							inputName="password"
							change={this.handleInputChange}
							inputValue={password}
							/>
							{errors.password && (<small className="f6 black-60 db tc">
						      {errors.password}
						    </small>)}
							<Input 
							inputType="password"
							inputText="Confirm password..."
							inputName="password2"
							change={this.handleInputChange}
							inputValue={password2}
							/>
							{errors.password2 && (<small className="f6 black-60 db tc">
						      {errors.password2}
						    </small>)}
							<SubmitBtn button="Sign up" />
						</FormBody>
		        	</FormContainer>
		    	</div>
	    	</Fragment>
	    );
	}
};

Register.displayName = 'Register';

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));