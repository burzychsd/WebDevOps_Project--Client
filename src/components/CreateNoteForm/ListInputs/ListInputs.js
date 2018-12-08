import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as RemoveBtn } from './close.svg';
import { addInput, removeInput } from '../../../actions/inputs';
import styles from './ListInputs.module.scss';

class ListInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    componentDidMount() {
        if(this.props.list && this.props.listItems.length === 0) {
            this.props.list.forEach((item, i) => {
                this.props.addInput();
            });
        }
    }

    handleItems = (itemId, item) => {
        this.props.removeInput(itemId);
        this.props.remove(item);
    }

    render() {
        const items = this.props.listItems.map((itemId, i) => {
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
                        placeholder={this.props.status ? '' : this.props.list[i]}
                        type="text" name={this.props.status ? `listItem${i}` : `newListItem${i}`} onChange={this.props.change} required={this.props.status ? true : false} />
                        <div className="h-100 flex justify-center items-center"
                        style={{ width: 30 }} 
                        onClick={() => this.props.status ? this.props.removeInput(itemId) : 
                        this.handleItems(itemId, this.props.list[i])}>
                            <RemoveBtn className={styles.RemoveBtn} />
                        </div>
                    </div>
                )
            }
        )

        return (
            <div className="w-100 flex flex-column">
                <p className="pl2 mv1 pointer" onClick={() => this.props.addInput()}>Click here to add list item...</p>
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
