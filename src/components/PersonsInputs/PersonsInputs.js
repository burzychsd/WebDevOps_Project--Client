import React, { Fragment, Component } from 'react';
import { ReactComponent as AcceptBtn } from './acceptBtn.svg';
import { ReactComponent as RemoveBtn } from './removeBtn.svg';
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
		this.props.data[inputName.name] = null;
		this.props.data[inputEmail.name] = null;
		this.props.remove(inputName.value, inputEmail.value);
		this.props.removeInput(key);
	}

	render() {

		const arr = this.props.arrOfInputs;

		const inputs = arr.map((key, i) => 
			<div className="flex flex-column justify-center items-center" key={key}>
				<input className={styles.PersonsInputs} type="text" placeholder="Name" name={`name[${i}]`} onChange={this.props.change} ref={(input) => this[`inputName${key}`] = input}/>
				<input className={styles.PersonsInputs} type="text" placeholder="Email" name={`email[${i}]`} onChange={this.props.change} ref={(input) => this[`inputEmail${key}`] = input}/>
				<div className="flex justify-center items-center">
					<div ref={(button) => this.removeBtn = button} style={{ display: 'none' }}>
						<RemoveBtn onClick={(e) => this.handleRemoveInput(e, key)} />
					</div>
					<div ref={(button) => this.acceptBtn = button}>
						<AcceptBtn onClick={(e) => this.props.accept(e, this[`inputName${key}`].value, this[`inputEmail${key}`].value, this.acceptBtn, this.removeBtn)} />
					</div>
				</div>
	    	</div>
	    );

		return (
	    	<Fragment>
	    		<h1 className="tc">Add your people</h1>
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
