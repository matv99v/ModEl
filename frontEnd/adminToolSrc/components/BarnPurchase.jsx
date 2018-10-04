import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from 'AliasApi/api';
import './BarnPurchase.scss';


export default class Barn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barn: [],
        };
    }

    componentDidMount() {
        api.getBarn()
            .then(json=> json.filter(el => el.zakQnty !== el.restQnty))
            .then(json => this.setState({barn: json}));
    }

    getItemId(transaction) {
        return `${transaction.zakNumber}-${transaction.idProduct}`;
    }

    renderDublicatePredicate(i, field, transaction) {
        return !(i && transaction[field] === this.state.barn[i-1][field]);
    }

    getTrClass(i, transaction) {
        let classList= [];

        if (this.renderDublicatePredicate(i, 'CategoryName', transaction)) {
            classList.push('cat');
        }
        if (this.renderDublicatePredicate(i, 'productName', transaction)) {
            classList.push('prod');
        }

        return classList.join(' ');
    }

    render() {
        return (
            <Table condensed responsive hover className='BarnPurchase__Cnt'>
                <thead>
                    <tr>
                        {
                            [
                                'CategoryName',
                                'productName',
                                'zakNumber',
                                'zakDate',
                                'zakDateRcv',
                                'zakDateShp',
                                'zakQnty',
                                'restQnty',
                                'zakSum',
                                'curRate',
                                // 'zakLink',
                                // 'frozQnty',
                                // 'zakDateProtct',
                                ''
                            ].map((field, i) => (
                                <th key={i}>{field}</th>
                            ))
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.barn.map((transaction, i) => (
                            <tr key={i} className={this.getTrClass(i, transaction)}>
                                <td>{this.renderDublicatePredicate(i, 'CategoryName', transaction) && transaction.CategoryName}</td>
                                <td>{this.renderDublicatePredicate(i, 'productName', transaction) && transaction.productName}</td>
                                <td><a href={transaction.zakLink} target='_blank' rel='noopener noreferrer'>{transaction.zakNumber}</a></td>
                                <td>{transaction.zakDate}</td>
                                <td>{transaction.zakDateRcv}</td>
                                <td>{transaction.zakDateShp}</td>
                                <td>{transaction.zakQnty}</td>
                                <td>{transaction.restQnty}</td>
                                <td>{transaction.zakSum}</td>
                                <td>{transaction.curRate}</td>
                                {/* <td>{transaction.zakLink}</td> */}
                                {/* <td>{transaction.frozQnty}</td> */}
                                {/* <td>{transaction.zakDateProtct}</td> */}
                                <td><Link to={`/barn/edit/${this.getItemId(transaction)}`}>Править</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>


        );
    }
}
