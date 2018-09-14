import React from 'react';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';



import './Breadcrumbs.scss';




export default class Breadcrumbs extends React.Component {


    render() {
        const activeCategoryObj = this.props.catalog[this.props.activeCategoryId];
        const activeGoodObj = activeCategoryObj && activeCategoryObj.goods.find(good => good.idProduct === +this.props.activeGoodId);

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
                                                <Link href={item.url} to={item.url} >
                                                    {item.name}
                                                </Link>
                                        }
                                    </li>
                                );})

                        }
                    </ul>

                </Grid>
            </div>

        );
    }
}
