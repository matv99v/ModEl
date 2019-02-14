import React from 'react';
import { Table } from 'react-bootstrap';
import api from 'AliasApi/api';
import GoodsSearchTableCat from './GoodsSearchTableCat';
import helpers from 'AliasRoot/helpers/helpers';
import './GoodsSearch.scss';

export default class GoodsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {goods: []};
    }

    componentDidMount() {
        api.getGoods()
            .then(data => {
                this.setState({goods: data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    rowClick = goodId => {
        this.props.history.push(`/goods/${goodId}`);
    }

    render() {
        return (
            <Table condensed responsive hover className="Goods__Cnt">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>GoodId</th>
                        <th>CatId</th>
                        <th>Price</th>
                        <th>Exist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.goods
                            .sort(helpers.sortByPropName('CategoryName'))
                            .map((good, i, arr) => {
                                const showCatName = (i === 0) || (good.CategoryName !== arr[i-1].CategoryName);
                                return (
                                    <GoodsSearchTableCat
                                        key={good.idProduct}
                                        good={good}
                                        showCatName={showCatName}
                                        rowClick={this.rowClick}
                                    />
                                );
                            })
                    }
                </tbody>
            </Table>
        );
    }
}
