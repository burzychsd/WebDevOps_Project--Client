import React, { Component, Fragment } from 'react';
import scrollLock from 'scroll-lock';
import { connect } from 'react-redux';
import { ReactComponent as CloseBtn } from './close.svg';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');
const html = document.getElementsByTagName('html')[0];

class Modal extends Component {

	componentWillUnmount() {
		scrollLock.show();
    }

	componentDidMount() {
		scrollLock.hide(this.content);
	}

    render() {
        return ReactDOM.createPortal(
        	<Fragment>
	            <div className={this.props.nav ? `${styles.ModalBackground} ${styles.navActive}` : `${styles.ModalBackground}`}>
	            	<div className={`${styles.ModalBody} flex flex-column`}>
	            		<div className={styles.ModalContent} ref={(ref) => this.content = ref}>
	            			<div className="w-100 relative" style={{ height: 30 }}>
		        				<CloseBtn className={styles.ModalCloseBtn} onClick={this.props.clicked}/>
		        			</div>
				        		{this.props.children}
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
