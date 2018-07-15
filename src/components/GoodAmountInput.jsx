import React from 'react';
import './GoodAmountInput.scss';
import { Button } from 'react-bootstrap';


export default class GoodAmountInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputEl = React.createRef();
    }

    inputHandler = () => {
        const isNumbersOnly = /^\d+$/.test(this.inputEl.current.value);
        const isLengthOk = this.inputEl.current.value.length < 4;
        if (isNumbersOnly && isLengthOk) {
            this.props.amountChangeCb(this.props.good.idproduct, +this.inputEl.current.value, true);
        }
    };

    changeHandler = (e, amount) => {
        e.preventDefault();
        this.props.amountChangeCb(this.props.good.idproduct, amount);
    };

    render() {
        return (
            <span className="GoodAmountInput__cnt">
                <Button onClick={(e) => this.changeHandler(e, -1)}>—</Button>
                <span className='input-wrapper'>
                    <input
                        type="text"
                        onClick={(e) => e.preventDefault()}
                        onChange={this.inputHandler}
                        ref={this.inputEl}
                        value={this.props.defValue}
                        pattern='[0-9]'
                    />
                </span>
                <Button onClick={(e) => this.changeHandler(e, 1)}>+</Button>
            </span>
        );
    }
}
