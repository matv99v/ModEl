import React from 'react';
import { Table } from 'react-bootstrap';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from 'AliasApi/api';

import './BarnSearch.scss';


export default class Barn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barn: [],
            sortBy: '',
            reverse: 1
        };
    }

    componentDidMount() {
        api.getBarn()
            .then(json => {
                this.setState({barn: json});
            });
    }

    getItemId(transaction) {
        return `${transaction.zakNumber}-${transaction.idProduct}`;
    }

    handleSortClick(field) {

        const newBarn = this.state.barn
            .map(a => ({...a})) // do not mutate data!
            .sort((a, b) => {
                const nameA = a[field];
                const nameB = b[field];
                if (nameA < nameB) {
                    return -1 * this.state.reverse;
                }
                if (nameA > nameB) {
                    return 1 * this.state.reverse;
                }
                return 0;
            });

        this.setState({
            sortBy: field,
            barn: newBarn,
            reverse: field === this.state.sortBy ? this.state.reverse * (-1) : 1
        });
    }

    render() {
        const sortSign = <span style={{color: 'red'}} className='glyphicon glyphicon-sort-by-alphabet'></span>;

        return (
            <Table responsive hover className='BarnSearch__Cnt'>
                <thead>
                    <tr>

                        <th>#</th>

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
                            ].map((field, i) => (
                                <th key={i} onClick={() => this.handleSortClick(field)}>{field} {this.state.sortBy === field && sortSign}</th>
                            ))
                        }
                        {/* <th>#</th>
                        <th>CategoryName <span className='glyphicon glyphicon-sort-by-alphabet'></span></th>
                        <th>productName</th>
                        <th>zakNumber</th>
                        <th>zakDate</th>
                        <th>zakDateRcv</th>
                        <th>zakDateShp</th>
                        <th>zakQnty</th>
                        <th>restQnty</th>
                        <th>zakSum</th>
                        <th>curRate</th> */}
                        {/* <th>zakLink</th> */}
                        {/* <th>frozQnty</th> */}
                        {/* <th>zakDateProtct</th> */}
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.barn.map((transaction, i) => (
                            <tr key={i} >
                                <td>{i+1}</td>
                                <td>{transaction.CategoryName}</td>
                                <td>{transaction.productName}</td>
                                <td>{transaction.zakNumber}</td>
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
