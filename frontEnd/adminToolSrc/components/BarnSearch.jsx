import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import hash from 'object-hash';



import { fetchBarnAsync } from 'AliasAdminToolSrc/redux/actions/barn-actions.js';






class Barn extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchBarnAsync());
    }

    getItemId(transaction) {
        return `${transaction.zakNumber}-${transaction.idProduct}`;
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
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.barn.map((transaction, i) => (
                                <tr key={i} >
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
                                    <td><Link to={`/barn/edit/${this.getItemId(transaction)}`}>Править</Link></td>
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
    barn: state.barn
});

export default connect(mapStateToProps)(Barn);
