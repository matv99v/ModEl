import React from 'react';
import './GoodPrice.scss';

import { Button } from 'react-bootstrap';
import { addToCartAction } from 'AliasReduxActions/cart-actions';
import { connect } from 'react-redux';





class GoodPrice extends React.Component {

  styleClasses = {
    horizontal: 'GoodPrice__cnt horizontal',
    vertical: 'GoodPrice__cnt vertical',
    stretched: 'GoodPrice__cnt stretched',
  }

  getClass = () => {
    let resultClass = this.styleClasses.horizontal;

    if (this.styleClasses[this.props.type]) {
      resultClass = this.styleClasses[this.props.type];
    }

    return resultClass;
  }

  handleButtonClick = (e) => {
    e.stopPropagation();
    const payload = {
        goodId: this.props.goodId,
        amount: 1
    };
    this.props.dispatch(addToCartAction(payload));
  }




  render() {
    const stylesClass = this.getClass();

    return (
        <div className={stylesClass}>
            <div className="GoodPrice__actualValue">{this.props.value} грн</div>
            {false && <Button bsSize="sm" onClick={(e) => {this.handleButtonClick(e)}}>В корзину</Button>}
        </div>
    );
  }
};


const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(GoodPrice);
