import React from 'react';
import { FormContainer, FormTitle, FormBody, Input, SubmitBtn } from '../Form';
import BackBtn from '../Buttons/BackBtn';

const Register = (props) => {
    return (
        <div className="w-100 h-100 flex flex-column justify-center align-center">
    		<FormContainer>
        		<FormTitle title="Sign up" />
				<FormBody submit={() => console.log()}>
					<Input 
					inputType="text"
					inputText="Username..."
					inputName="username"
					change={() => console.log()}
					/>
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
					<Input 
					inputType="password"
					inputText="Confirm password..."
					inputName="password2"
					change={() => console.log()}
					/>
					<SubmitBtn button="Sign up" />
				</FormBody>
        	</FormContainer>
			<BackBtn />
    	</div>
    );
};

Register.displayName = 'Register';

export default Register;