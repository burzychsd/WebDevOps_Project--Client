// DEPENDENCIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { addInput, removeInput } from '../../../actions';

// COMPONENTS
import { ReactComponent as RemoveBtn } from './close.svg';

// STYLES
import styles from './ListInputs.module.scss';

class ListInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    componentDidMount() {
        const { list, listItems, addInput } = this.props;
        if(list && listItems.length === 0) {
            list.forEach((item, i) => {
                addInput();
            });
        }
    }

    handleItems = (itemId, item) => {
        const { removeInput, remove } = this.props;
        removeInput(itemId);
        remove(item);
    }

    render() {
        const { listItems, status, list, addInput, removeInput, change } = this.props;
        const items = listItems.map((itemId, i) => {
                const promise = new Promise((resolve) => {
                    this[`input${i}`] = React.createRef();
                    resolve();
                });
                promise.then(() => {
                    if(this[`input${i}`].current.placeholder || this[`input${i}`].current.placeholder !== '') {
                        this[`input${i}`].current.disabled = true;
                    }
                });
                return (
                    <div className="w-100 ph2 mt2 flex justify-between items-center" key={itemId}>
                        <input className={`${styles.ListInput} w-80 mv2`} 
                        ref={this[`input${i}`]}
                        placeholder={status ? '' : list[i]}
                        type="text" name={status ? `listItem${i}` : `newListItem${i}`} onChange={change} required={status ? true : false} />
                        <div className="h-100 flex justify-center items-center"
                        style={{ width: 30 }} 
                        onClick={() => status ? removeInput(itemId) : 
                        this.handleItems(itemId, list[i])}>
                            <RemoveBtn className={styles.RemoveBtn} />
                        </div>
                    </div>
                )
            }
        )

        return (
            <div className="w-100 flex flex-column">
                <p className="pl2 mv1 pointer" onClick={() => addInput()}>Click here to add list item...</p>
                {items}
            </div>
        );
    }
};

ListInputs.displayName = 'ListInputs';

const mapStateToProps = (state) => ({
    listItems: state.inputs.listItems
});

export default connect(mapStateToProps, {
    addInput,
    removeInput
})(ListInputs);
