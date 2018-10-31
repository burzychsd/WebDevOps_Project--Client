import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/auth';
import { FormContainer, FormTitle, FormBody, Input, SubmitBtn } from '../../components/Form';
import BackBtn from '../../components/Buttons/BackBtn';

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
		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}
		this.props.registerUser(user, this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
	}

	render() {
		const { errors } = this.state;
		return (
	        <div className="w-100 flex flex-column justify-center align-center mb3" style={{ minHeight: '100%' }}>
	    		<FormContainer>
	        		<FormTitle title="Sign up" />
					<FormBody submit={this.handleSubmit}>
						<Input 
						inputType="text"
						inputText="Username..."
						inputName="username"
						change={this.handleInputChange}
						inputValue={this.state.username}
						/>
						{errors.username && (<small className="f6 black-60 db tc">
					      {errors.username}
					    </small>)}
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
						<Input 
						inputType="password"
						inputText="Confirm password..."
						inputName="password2"
						change={this.handleInputChange}
						inputValue={this.state.password2}
						/>
						{errors.password2 && (<small className="f6 black-60 db tc">
					      {errors.password2}
					    </small>)}
						<SubmitBtn button="Sign up" />
					</FormBody>
	        	</FormContainer>
				<BackBtn />
	    	</div>
	    );
	}
};

Register.displayName = 'Register';

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));