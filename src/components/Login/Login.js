import React from 'react';
import { FormContainer, FormTitle, FormBody, Input, SubmitBtn } from '../Form';
import BackBtn from '../Buttons/BackBtn';

const Login = (props) => {
    return (
    	<div className="w-100 h-100 flex flex-column justify-center align-center">
    		<FormContainer>
        		<FormTitle title="Sign in" />
				<FormBody submit={() => console.log()}>
					<Input 
					inputType="email"
					inputText="Email..."
					inputName="email"
					change={() => console.log()}
					/>
					<Input 
					inputType="password"
					inputText="Password..."
					inputName="password"
					change={() => console.log()}
					/>
				</FormBody>
				<SubmitBtn button="Sign in" />
        	</FormContainer>
			<BackBtn />
    	</div>
    );
};

Login.displayName = 'Login';

export default Login;