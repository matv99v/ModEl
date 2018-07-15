import React from 'react';
import './Cart.scss';
import { Image, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCartAction, updateGoodQuantityAction } from 'AliasReduxActions/cart-actions';
import PlaceOrderModalForm from './PlaceOrderModalForm.jsx';
import GoodAmountInput from './GoodAmountInput.jsx';




class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isModalVisible: false};
    }

    handleAmountChange = (goodId, amount, isReplace=false) => {
        const payload = { goodId, amount, isReplace };
        this.props.dispatch(updateGoodQuantityAction(payload));
    }

    handleRemoveItem(e, id) {
        e.preventDefault();
        this.props.dispatch(removeFromCartAction(id));
    }

    handlePlaceOrderClick() {
        console.log('handlePlaceOrderClick');
        this.setState({isModalVisible: true});
    }

    handleClose() {
        console.log('handleClose');
        this.setState({isModalVisible: false});
    }

    render() {
        const {cart, goods} = this.props;
        const cartKeys = Object.keys(cart);

        const total = cartKeys.reduce((acc, key) => {
            const good = goods.find(good => good.idproduct === +key);
            return cart[key] * good.Declare_price + acc;
        }, 0);

        return (
            <div className="list-group Cart__cnt">
                {
                    Object.keys(this.props.cart)
                        .map(goodId => {
                            const goodObj = this.props.goods.find(good => {
                                return good.idproduct == goodId;
                            });
                            return goodObj;
                        })
                        .map((good, i) => {
                            const url = `/catalog/${good.idproduct}`;
                            return (
                                <Link to={url} className="list-group-item" key={i}>

                                    <div className='Cart__good'>

                                        <div className='Cart__good_remove_cross'>
                                            <span className="glyphicon glyphicon-remove" onClick={(e) => this.handleRemoveItem(e, good.idproduct)}></span>
                                        </div>

                                        <div className='Cart__good_img_cnt'>
                                            <Image src={'https://scm.ncsu.edu/as/scm/i/channels/articles/scm/production-types-of-goods.gif'} />
                                        </div>

                                        <div className='Cart__good_desc'>
                                            <h5 className="list-group-item-heading">{good.product_name}</h5>
                                            <h5 className="list-group-item-heading">{good.Declare_price} грн</h5>
                                        </div>

                                        <div className="Cart_good_amount">
                                            <GoodAmountInput
                                                amountChangeCb={this.handleAmountChange}
                                                good={good}
                                                defValue={this.props.cart[good.idproduct]}
                                            />
                                        </div>

                                        <div className="Cart_good_sum">
                                            <h5 className='list-group-item-heading'>
                                                {good.Declare_price * this.props.cart[good.idproduct]}
                                            </h5>

                                            <h5 className='list-group-item-heading'>
                                                грн
                                            </h5>

                                        </div>

                                    </div>

                                </Link>
                            );
                        })
                }


                <hr/>

                <div className="Order__total">
                    <h6>Итого: {total} грн</h6>
                </div>

                <div className="Order__cnt">
                    <Button bsSize="large" bsStyle="success" onClick={(e) => this.handlePlaceOrderClick()} >Оформить заказ</Button>
                </div>

                <PlaceOrderModalForm
                    isVisible={this.state.isModalVisible}
                    hideCb={this.handleClose.bind(this)}
                />

            </div>

        );
    }
};


const mapStateToProps = (state) => ({
    cart: state.cart,
    goods: state.goods
});

export default connect(mapStateToProps)(Cart);
