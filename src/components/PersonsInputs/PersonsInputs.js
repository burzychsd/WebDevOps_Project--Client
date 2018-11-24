import React, { Fragment, Component } from 'react';
import { ReactComponent as AddBtn } from './addBtn.svg';
import { connect } from 'react-redux';
import { addInput, removeInput } from '../../actions/personsInputs';
import styles from './PersonsInputs.module.scss';

class PersonsInputs extends Component {

	handleRemoveInput = (event, key) => {
		const inputName = this[`inputName${key}`];
		const inputEmail = this[`inputEmail${key}`];
		inputName.style.display = 'none';
		inputEmail.style.display = 'none';
		event.target.style.display = 'none';
		this.props.data[inputName.name] = '';
		this.props.data[inputEmail.name] = '';
		this.props.remove(inputName.value, inputEmail.value);
		this.props.removeInput(key);
	}

	render() {

		const arr = this.props.arrOfInputs;

		const inputs = arr.map((key, i) => 
			<div key={key}>
				<input type="text" name={`name[${i}]`} onChange={this.props.change} ref={(input) => this[`inputName${key}`] = input}/>
				<input type="email" name={`email[${i}]`} onChange={this.props.change} ref={(input) => this[`inputEmail${key}`] = input}/>
				<button onClick={(e) => this.props.accept(e, this[`inputName${key}`].value, this[`inputEmail${key}`].value)}>Accept</button>
		    	<button onClick={(e) => this.handleRemoveInput(e, key)}>Remove</button>
	    	</div>
	    );

		return (
	    	<Fragment>
	    		<h1 className="tc">Add your people</h1>
	    		<AddBtn className={styles.AddBtn} onClick={this.props.addInput} />
	    		{inputs}
	    	</Fragment>
	    );
	}
};

PersonsInputs.displayName = 'PersonsInputs';

const mapStateToProps = state => ({
    arrOfInputs: state.personsInputs.arrOfInputs
});

export default connect(mapStateToProps, { addInput, removeInput })(PersonsInputs);
