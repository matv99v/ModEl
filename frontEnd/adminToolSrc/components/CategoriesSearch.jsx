import React from 'react';
import { Table } from 'react-bootstrap';


import api from 'AliasApi/api';






export default class CategoriesSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {catregories: []};
    }

    componentDidMount() {
        api.getCategories(/*{enabled: true}*/)
            .then(data => {
                this.setState({catregories: data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (

            <div>

                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.catregories.map((cat, i) => (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{cat.CategoryName}</td>
                                    <td>{cat.idCategory}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>






        );
    }
}
