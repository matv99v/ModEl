import React from 'react';
import { connect } from 'react-redux';
import api from 'AliasApi/api';
import Spinner from 'AliasAdminToolSrc/components/common/Spinner';
import GoodForm from './GoodForm';


// import { reduxForm, change } from 'redux-form';
// import { Button, Grid, Row, Col } from 'react-bootstrap';
// import RichTextEditor from 'AliasAdminToolSrc/components/common/RichTextEditor';
// import FormItem from 'AliasAdminToolSrc/components/common/FormItem';
// import { AsyncTypeahead } from 'react-bootstrap-typeahead';
// import { alertMessage } from 'AliasAdminToolSrc/redux/actions/sysdialogs-actions';


class GoodFormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: null,
            isLoading: true
        };
    }

    componentDidMount() {
        let data = null;

        api.getGoods({
            id: this.props.match.params.id,
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
                {
                    this.state.isLoading
                        ? <Spinner show={this.state.isLoading} />

                        : <GoodForm
                            initialValues={this.state.initialValues}
                        />
                }
            </div>
        );
    }

}


const connectedGoodFormEdit = connect(null)(GoodFormEdit);
export default connectedGoodFormEdit;
