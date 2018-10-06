import React from 'react';
import BarnForm from './BarnForm.jsx';
import api from 'AliasApi/api';


export default class BarnFormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: null
        };
    }

    componentDidMount() {
        api.getBarn({
            hash: this.props.match.params.hash,
            exclideFields: ['CategoryName', 'products.idCategory'] 
        })
            .then(json => {
                this.setState({initialValues: json[0]});
                console.log(this.state);
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.initialValues
                        ? <BarnForm
                            initialValues={this.state.initialValues}
                            type='put'
                            hash={this.props.match.params.hash}
                        />
                        : <div>Loading...</div>
                }
            </div>




        );
    }
}
