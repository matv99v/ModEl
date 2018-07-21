import React from 'react';
import './Cart.scss';
import { Image, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCartAction, updateGoodQuantityAction } from 'AliasReduxActions/cart-actions';
import PlaceOrderModalForm from './PlaceOrderModalForm.jsx';
import DevInfo from './DevInfo.jsx';

import GoodsList from './GoodsList.jsx';





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

    getTotal() {
      const {cart, goods} = this.props;
      const cartKeys = Object.keys(cart);

      return cartKeys.reduce((acc, key) => {
        const good = goods.find(good => good.idProduct === +key);
        return cart[key] * good.declarePrice + acc;
      }, 0);
    }

    render() {

      const pickedGoods = Object.keys(this.props.cart)
          .map(goodId => {
              const goodObj = this.props.goods.find(good => {
                  return good.idProduct == goodId;
              });
              return goodObj;
          });

        return (
            <div className="Cart__cnt">

                <GoodsList goods={pickedGoods} mode="cart"/>

                <div className="Order__total">
                    <h6>Итого: {this.getTotal()} грн</h6>
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
