import React from 'react';
import BarnForm from './BarnForm';
import api from 'AliasApi/api';
import { connect } from 'react-redux';
import Spinner from 'AliasAdminToolSrc/components/common/Spinner';



class BarnFormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        let data = null;

        api.getBarn({
            hash: this.props.match.params.hash,
            excludeFields: ['CategoryName', 'products.idCategory']
        })
            .then(json => data = json[0])
            .catch(err => console.log(err))
            .finally(() => this.setState({
                isLoading: false,
                initialValues: data
            }));
    }

    render() {
        // initialValues prop will be used by redux-form as init values in BarnForm component
        return (
            <div>
                {
                    this.state.isLoading
                        ? <Spinner show={this.state.isLoading} />

                        : <BarnForm
                            initialValues={this.state.initialValues}
                            type='put'
                            hash={this.props.match.params.hash}
                        />
                }
            </div>
        );
    }
}

const connectedBarnFormEdit = connect(null)(BarnFormEdit);
export default connectedBarnFormEdit;
