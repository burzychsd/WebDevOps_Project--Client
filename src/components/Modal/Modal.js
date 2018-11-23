import React, { Component, Fragment } from 'react';
import { ReactComponent as CloseBtn } from './close.svg';
import styles from './Modal.module.scss';


class Modal extends Component {

    render() {
        return (
        	<Fragment>
	            <div className={styles.ModalBackground}></div>
	        		<div className={`${styles.ModalBody} flex flex-column`}>
	        			<div className="w-100" style={{ height: 30 }}>
	        				<CloseBtn className={styles.ModalCloseBtn} onClick={this.props.clicked}/>
	        			</div>
			        		{this.props.children}
			        </div>
            </Fragment>
        );
    }
}

export default Modal;
