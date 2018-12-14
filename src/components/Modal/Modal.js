// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import scrollLock from 'scroll-lock';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

// COMPONENTS
import { ReactComponent as CloseBtn } from './close.svg';

// STYLES
import styles from './Modal.module.scss';

// GLOBAL VARIABLES
const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

	componentWillUnmount() {
		scrollLock.show();
    }

	componentDidMount() {
		scrollLock.hide(this.content);
	}

    render() {
    	const { nav,children, clicked } = this.props;
        return ReactDOM.createPortal(
        	<Fragment>
	            <div className={nav ? `${styles.ModalBackground} ${styles.navActive}` : `${styles.ModalBackground}`}>
	            	<div className={`${styles.ModalBody} flex flex-column`}>
	            		<div className={styles.ModalContent} ref={(ref) => this.content = ref}>
	            			<div className="w-100 relative" style={{ height: 30 }}>
		        				<CloseBtn className={styles.ModalCloseBtn} onClick={clicked}/>
		        			</div>
				        		{children}
		            	</div>
			        </div>
	            </div>
            </Fragment>,
            modalRoot
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav.isOpen
});

export default connect(mapStateToProps, null)(Modal);
