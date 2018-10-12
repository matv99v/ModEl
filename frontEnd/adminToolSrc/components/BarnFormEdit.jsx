import React from 'react';
import BarnForm from './BarnForm.jsx';
import api from 'AliasApi/api';
import { connect } from 'react-redux';
import Spinner from './common/Spinner.jsx';



class BarnFormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: null,
            isLoading: true
        };
    }

    componentDidMount() {
        let data = null;

        api.getBarn({
            hash: this.props.match.params.hash,
            exclideFields: ['CategoryName', 'products.idCategory']
        })
            .then(json => data = json[0])
            .catch(err => console.log(err))
            .finally(() => this.setState({
                isLoading: false,
                initialValues: data
            }));
    }

    render() {
        return (
            <div>
                <Spinner show={this.state.isLoading} />

                <BarnForm
                    initialValues={this.state.initialValues}
                    type='put'
                    hash={this.props.match.params.hash}
                />
            </div>
        );
    }
}

const connectedBarnFormEdit = connect(null)(BarnFormEdit);
export default connectedBarnFormEdit;
