// DEPENDENCIES
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid'

// ACTIONS
import { removeInput } from '../../actions/inputs';

// COMPONENTS
import { ReactComponent as AcceptBtn } from './acceptBtn.svg';
import { ReactComponent as RemoveBtn } from '../Modal/close.svg';

// STYLES
import styles from './PersonsInputs.module.scss';

class PersonsInputs extends Component {

	handleRemoveInput = (event, removeBtn, name, email) => {
		const { remove } = this.props;
		remove(name, email);
		removeBtn.style.display = 'none';
	}

	render() {

		const { arrOfInputs, name, email, accept, change } = this.props;
		const arr = arrOfInputs;
		const names = name;
		const emails = email;
		console.log(arr)

		const inputs = arr.map((key, i) => 
			<div className="flex flex-column justify-center items-center" key={shortid.generate()}>
				<form className={styles.PersonsForm} onSubmit={(e) => accept(e, this[`inputName${key}`], this[`inputEmail${key}`])}>
					<input className={styles.PersonsInputs} type="text" placeholder="Full Name" name={`name[${i}]`} onChange={change} ref={(input) => this[`inputName${key}`] = input} pattern=".{3,25}" required title="3 to 25 characters"/>
					<input className={styles.PersonsInputs} type="email" placeholder="Email" name={`email[${i}]`} onChange={change} ref={(input) => this[`inputEmail${key}`] = input} required />
					<div className="flex justify-center items-center">
						<div ref={(button) => this.acceptBtn = button}>
							<label>
							<input type="submit" />
							<AcceptBtn className={styles.AcceptBtn} />
							</label>
						</div>
					</div>
				</form>
	    	</div>
	    );

	    const persons = names.map((el, i) => 
	    	<div className={`${styles.PersonsDisplayContainer} w-100 flex justify-between items-center ph2 pv3 flex-wrap`} key={i}>
	    		<div className={`${styles.PersonsCircle} flex justify-center items-center`}>
	    			<div ref={(button) => this.removeBtn = button}>
	    				<RemoveBtn className={styles.RemoveBtn} onClick={(e) => this.handleRemoveInput(e, this.removeBtn, el, emails[i])} />
	    			</div>
	    		</div>
	    		<div className={`${styles.PersonsDataContainer} flex flex-column justify-center items-center ph3`}>
					<h3>{el}</h3>
					<hr className="w-60" />
	    			<h4>{emails[i]}</h4>
	    		</div>
	    	</div>
	    );

		return (
	    	<Fragment>
	    		<h1 className="tc">Add your people</h1>
	    		{persons}
	    		{inputs}
	    	</Fragment>
	    );
	}
};

PersonsInputs.displayName = 'PersonsInputs';

const mapStateToProps = state => ({
    arrOfInputs: state.inputs.arrOfInputs
});

export default connect(mapStateToProps, { removeInput })(PersonsInputs);
