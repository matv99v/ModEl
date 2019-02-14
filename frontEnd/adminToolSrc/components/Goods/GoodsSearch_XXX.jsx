import React from 'react';
import { Table } from 'react-bootstrap';
import api from 'AliasApi/api';
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
            <Table striped className="Goods__Cnt">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>GoodId</th>
                        <th>CatId</th>
                        <th>Price</th>
                        <th>Exist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.goods.map((good, i) => (
                            <tr
                                key={i}
                                onClick={() => this.rowClick(good.idProduct)}
                            >
                                <td>{i+1}</td>
                                <td>{good.productName}</td>
                                <td>{good.idProduct}</td>
                                <td>{good.idCategory}</td>
                                <td>{good.declarePrice}</td>
                                <td>{good.exist}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}
