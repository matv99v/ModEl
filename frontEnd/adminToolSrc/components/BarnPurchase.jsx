import React from 'react';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import api from 'AliasApi/api';
import './BarnPurchase.scss';


class Barn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barn: [],
        };
    }

    componentDidMount() {
        api.getBarn()
            .then(json=> json.filter(el => el.restQnty !== el.frozQnty))
            .then(json => this.setState({barn: json}));
    }

    renderDuplicatePredicate(i, field, transaction) {
        return !(i && transaction[field] === this.state.barn[i-1][field]);
    }

    getTrClass(i, transaction) {
        let classList= [];

        if (this.renderDuplicatePredicate(i, 'CategoryName', transaction)) {
            classList.push('cat');
        }
        if (this.renderDuplicatePredicate(i, 'productName', transaction)) {
            classList.push('prod');
        }
        return classList.join(' ');
    }

    handleRowClick(transaction, e) {
        if (e.target.tagName !== 'A') {
            this.props.history.push(`/barn/edit/${transaction.zakNumber}-${transaction.idProduct}`);
        }
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
                                'zakDateProtct',
                                'zakQnty',
                                'restQnty',
                                'frozQnty',
                                'zakSum',
                                'curRate',
                            ].map((field, i) => (
                                <th key={i}>{field}</th>
                            ))
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.barn.map((transaction, i) => (
                            <tr key={i}
                                className={this.getTrClass(i, transaction)}
                                onClick={(e) => this.handleRowClick(transaction, e)}
                            >
                                <td>{this.renderDuplicatePredicate(i, 'CategoryName', transaction) && transaction.CategoryName}</td>
                                <td>{this.renderDuplicatePredicate(i, 'productName', transaction) && transaction.productName}</td>
                                <td><a href={transaction.zakLink} target='_blank' rel='noopener noreferrer'>{transaction.zakNumber}</a></td>
                                <td>{transaction.zakDate}</td>
                                <td>{transaction.zakDateRcv}</td>
                                <td>{transaction.zakDateShp}</td>
                                <td>{transaction.zakDateProtct}</td>
                                <td>{transaction.zakQnty}</td>
                                <td>{transaction.restQnty}</td>
                                <td>{transaction.frozQnty}</td>
                                <td>{transaction.zakSum}</td>
                                <td>{transaction.curRate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

const withRouterBarn = withRouter(({ history }) => (
    <Barn history={history}/>
));

export default withRouterBarn;
