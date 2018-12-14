// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { loginUser } from '../../actions';

// COMPONENTS
import { FormContainer, FormTitle, FormBody, Input, SubmitBtn, BackBtn } from '../../components';

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
		const { loginUser, history } = this.props;
		const { email, password } = this.state;
		const user = {
			email,
			password
		}
		loginUser(user, history)
	}

	componentWillReceiveProps(nextProps) {
		const { history } = this.props;
		if(nextProps.auth.isAuthenticated) {
            history.push('/dashboard')
        }
		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	componentDidMount() {
		const { auth, history } = this.props;
		if(auth.isAuthenticated) {
            history.push('/dashboard');
        }
	}

	render() {
		const { errors, email, password } = this.state;
		return (
			<Fragment>
				<div className="w-100 relative">
					<BackBtn />
				</div>
		    	<div className="w-100 flex flex-column justify-center align-center" style={{ minHeight: '100vh' }}>
		    		<FormContainer>
		        		<FormTitle title="Sign in" />
						<FormBody submit={this.handleSubmit}>
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
							<SubmitBtn button="Sign in" />
						</FormBody>
		        	</FormContainer>
		    	</div>
	    	</Fragment>
	    );
	}
};

Login.displayName = 'Login';

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));