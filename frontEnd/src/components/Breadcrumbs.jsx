import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Grid, Row, Col, Well } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setActiveCategoryId, unsetActiveCategoryId } from 'AliasReduxActions/active-category-id-actions';
import { setActiveGoodIdAction, unsetActiveGoodIdAction } from 'AliasReduxActions/active-good-id-actions';



import './Breadcrumbs.scss';




class Breadcrumbs extends React.Component {

    handleBreadcrumbClick = (k) => {
        if (k) {
            this.props.dispatch(unsetActiveGoodIdAction());
        } else {
          this.props.dispatch(unsetActiveGoodIdAction());
          this.props.dispatch(unsetActiveCategoryId());
        }

    }

    render() {
        const activeCategoryObj = this.props.categories.find(cat => cat.idCategory === this.props.activeCategoryId);
        const activeGoodObj = this.props.goods.find(good => good.idProduct === this.props.activeGoodId);

        const arr = [activeCategoryObj, activeGoodObj]
            .filter(item => !!item)
            .map(item => ({
                name: item.CategoryName || item.productName,
                url: `/catalog/${item.idCategory}` + (item.idProduct ? `/${item.idProduct}` : '')
            }))
            .reduce(
                (acc, el) => [...acc, el],
                [{name: 'Все категории', url: '/catalog'}]
            );

        return (
          <div>
              <Grid fluid>

              <ul className='Breadcrumbs__Cnt'>
                {
                    arr.map((item, k) => {
                      const isTheLastElem = arr.length === k + 1;
                      return (
                        <li className={isTheLastElem ? 'active' : ''} key={k} >
                            {
                              isTheLastElem
                                ?
                                    <p>{item.name}</p>
                                :
                                    <Link href={item.url} to={item.url} onClick={() => this.handleBreadcrumbClick(k)} >
                                        {item.name}
                                    </Link>
                            }

                            {
                              // do not render trailing /
                              !isTheLastElem &&
                              <div className='Breadcrumb__devider'>&nbsp;/&nbsp;</div>
                            }

                        </li>
                    )})

                }
              </ul>

              </Grid>
          </div>

        );
    }
};


const mapStateToProps = (state) => ({
    categories: state.categories,
    goods: state.goods,
    activeCategoryId: state.activeCategoryId,
    activeGoodId: state.activeGoodId
});

export default connect(mapStateToProps)(Breadcrumbs);
