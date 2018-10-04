import React from 'react';
import { reduxForm, reset } from 'redux-form';
import FormItem from './common/FormItem.jsx';
import { Button, Grid, Row, Col, Alert } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { change } from 'redux-form';

// import { postToBarnAsync, putToBarnAsync } from 'AliasAdminToolSrc/redux/actions/barn-actions.js';

import api from 'AliasApi/api';




class BarnForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: [],
            dbMessage: { code: '', sqlMessage: '', message: ''},
            dbError: false
        };
    }

    resetForm() {
        this.props.dispatch(reset('BarnForm'));

    }

    print = (data) => {
        const copyData = {...data}; // do not mutate data!!!!
        delete copyData.productName; // this field for view only and belongs to another table

        if (this.props.type === 'put') {
            // this.props.dispatch(putToBarnAsync(data));
            api.updateBarn(this.props.hash, copyData)
                .then(resp => {
                    // dispatch(addToBarnAsync(data));
                    this.setState({dbMessage: resp, dbError: false});
                    // this.resetForm();
                    return null;
                })
                .catch(err => {
                    // console.error(err);
                    console.log(err);
                    this.setState({dbMessage: JSON.parse(err.message), dbError: true});
                })
                .finally(() => {
                    // dispatch(hideSpinnerAction());
                });


        } else {
            // this.props.dispatch(postToBarnAsync(data));

            api.postToBarn(copyData)
                .then(resp => {
                    // dispatch(addToBarnAsync(data));
                    this.setState({dbMessage: resp, dbError: false});
                    debugger;

                    // this.resetForm();
                    return null;
                })
                .catch(err => {
                    // console.error(err);
                    debugger;
                    this.setState({dbMessage: JSON.parse(err.message), dbError: true});
                })
                .finally(() => {
                    // dispatch(hideSpinnerAction());
                    debugger;

                });
        }
    }

    handleGoodSearch = (query) => {
        this.setState({isLoading: true});

        const obj = {
            table: 'products',
            field: 'productName',
            like: query
        };

        api.autocomplete(obj)
            .then(json => this.setState({
                isLoading: false,
                options: json
            }));
    }

    handleGoodInputChange = (selected) => {
        if (selected && selected.length > 0) {
            this.props.dispatch(change('BarnForm', 'idProduct', selected[0].idProduct));
        } else {
            this.props.dispatch(change('BarnForm', 'idProduct', ''));
        }
    }

    render() {
        return (

            <Grid>

                <Row>
                    <Col>
                        <h3>{this.props.type === 'put' ? 'Правка транзакции' : 'Новая транзакция'}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <form
                            className="form-horizontal"
                            onSubmit={this.props.handleSubmit(this.print)}
                        >

                            <div className="form-group">
                                <label className="col-sm-3 control-label">0 - Good name</label>
                                <div className="col-sm-9">
                                    <AsyncTypeahead
                                        labelKey='productName'
                                        isLoading={this.state.isLoading}
                                        options={this.state.options}
                                        onSearch={this.handleGoodSearch}
                                        onChange={this.handleGoodInputChange}
                                        defaultSelected={
                                            this.props.initialValues
                                                ? [this.props.initialValues]
                                                : [{productName: ''}]
                                        }
                                        disabled={this.props.type === 'put'}
                                    />
                                </div>

                            </div>

                            <FormItem
                                id="idProduct"
                                component="input"
                                type="number"
                                label="1 - Good ID"
                                disabled
                            />

                            <FormItem
                                id="zakNumber"
                                component="input"
                                type="number"
                                label="2 - Order number"
                                disabled={this.props.type === 'put'}
                            />

                            <FormItem
                                id="zakLink"
                                component="input"
                                type="text"
                                label="3 - Order link"
                            />

                            <FormItem
                                id="zakQnty"
                                component="input"
                                type="number"
                                label="4 - Ordered qty"
                            />

                            <FormItem
                                id="frozQnty"
                                component="input"
                                type="number"
                                label="5 - Frozen qty"
                            />

                            <FormItem
                                id="restQnty"
                                component="input"
                                type="number"
                                label="6 - In stock qty"
                            />

                            <FormItem
                                id="zakSum"
                                component="input"
                                type="number"
                                label="7 - Total, uah"
                            />

                            <FormItem
                                id="curRate"
                                component="input"
                                type="number"
                                label="8 - Currency exchange rate"
                            />

                            <FormItem
                                id="zakDate"
                                component="input"
                                type="date"
                                label="9 - Date of order"
                            />

                            <FormItem
                                id="zakDateShp"
                                component="input"
                                type="date"
                                label="10 - Date of shipment"
                            />

                            <FormItem
                                id="zakDateRcv"
                                component="input"
                                type="date"
                                label="11 - Date of recieving"
                            />

                            <FormItem
                                id="zakDateProtct"
                                component="input"
                                type="date"
                                label="12 - Date of protection"
                            />

                            <Button bsStyle="primary" type="submit">Submit</Button>


                        </form>
                    </Col>

                </Row>

                <Row style={{display: this.state.dbMessage.sqlMessage || this.state.dbMessage.affectedRows  ? 'block' : 'none'}}>
                    <Alert bsStyle={this.state.dbError ? 'danger' : 'success'}>
                        <h4>{this.state.dbError ? 'Error' : 'Success'}</h4>
                        <div>{this.state.dbMessage.code}</div>
                        <div>{this.state.dbMessage.sqlMessage}</div>
                        <div>{this.state.dbMessage.message}</div>
                    </Alert>;
                </Row>


            </Grid>

        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        initialValues: ownProps.initialValues
    };
}


const ReduxBarnForm = reduxForm(
    {
        // a unique name for the form
        form: 'BarnForm',
        // enableReinitialize: true
    },
    mapStateToProps
)(BarnForm);



export default connect(null)(ReduxBarnForm);
