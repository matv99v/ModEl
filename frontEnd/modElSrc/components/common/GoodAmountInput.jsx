import React from 'react';
import './GoodAmountInput.scss';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateGoodQuantityAction } from '../redux/actions/cart-actions/cart-actions';

// TODO: make dumb component




class GoodAmountInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputEl = React.createRef();
    }

    inputHandler = (e) => {
        const isNumbersOnly = /^\d+$/.test(this.inputEl.current.value);
        const isLengthOk = this.inputEl.current.value.length < 4;
        if (isNumbersOnly && isLengthOk) {
            this.changeHandler(e, +this.inputEl.current.value, true);
        }
    };

    changeHandler = (e, amount, isReplace=false) => {
        e.stopPropagation();
        const payload = {
            goodId: this.props.good.idProduct,
            amount,
            isReplace
        };
        this.props.dispatch(updateGoodQuantityAction(payload));
    };

    render() {
        return (
            <span className="GoodAmountInput__cnt">
                <Button onClick={(e) => this.changeHandler(e, -1)}>—</Button>
                <span className='input-wrapper'>
                    <input
                        type="text"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => this.inputHandler(e)}
                        ref={this.inputEl}
                        value={this.props.cart[this.props.good.idProduct]}
                        pattern='[0-9]'

                    />
                </span>
                <Button onClick={(e) => this.changeHandler(e, 1)}>+</Button>
            </span>
        );
    }
}



const mapStateToProps = (state) => ({
    cart: state.cart
});

export default connect(mapStateToProps)(GoodAmountInput);
