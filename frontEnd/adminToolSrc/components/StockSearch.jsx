import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


import { fetchStockAsync } from 'AliasAdminToolSrc/redux/actions/stock-actions.js';






class Stock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {stock: []};
    }

    componentDidMount() {
        this.props.dispatch(fetchStockAsync());
    }

    render() {
        return (

            <div>

                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>idProduct</th>
                            <th>zakNumber</th>
                            <th>zakDate</th>
                            <th>zakDateRcv</th>
                            <th>zakDateShp</th>
                            <th>zakQnty</th>
                            <th>restQnty</th>
                            <th>zakSum</th>
                            <th>curRate</th>
                            {/* <th>zakLink</th> */}
                            {/* <th>frozQnty</th> */}
                            {/* <th>zakDateProtct</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.stock.map((transaction, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{transaction.idProduct}</td>
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

                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>






        );
    }
}



const mapStateToProps = (state) => ({
    stock: state.stock
});

export default connect(mapStateToProps)(Stock);
