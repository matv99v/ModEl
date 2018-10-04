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
                    // this.resetForm();
                    return null;
                })
                .catch(err => {
                    // console.error(err);
                    this.setState({dbMessage: JSON.parse(err.message), dbError: true});
                })
                .finally(() => {
                    // dispatch(hideSpinnerAction());
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

            <Grid style={{paddingBottom: '25px'}}>

                <Row>
                    <Col>
                        <h3 className='text-center'>{this.props.type === 'put' ? 'Правка транзакции' : 'Новая транзакция'}</h3>
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
                                type="number"
                                label="1 - idProduct"
                                disabled
                            />

                            <FormItem
                                id="zakNumber"
                                type="number"
                                label="2 - zakNumber"
                                disabled={this.props.type === 'put'}
                            />

                            <FormItem
                                id="zakLink"
                                type="text"
                                label="3 - zakLink"
                            />

                            <FormItem
                                id="zakQnty"
                                type="number"
                                label="4 - zakQnty"
                            />

                            <FormItem
                                id="frozQnty"
                                type="number"
                                label="5 - frozQnty"
                            />

                            <FormItem
                                id="restQnty"
                                type="number"
                                label="6 - restQnty"
                            />

                            <FormItem
                                id="zakSum"
                                type="number"
                                label="7 - zakSum"
                            />

                            <FormItem
                                id="curRate"
                                type="number"
                                label="8 - curRate"
                                step="0.01"
                            />

                            <FormItem
                                id="zakDate"
                                type="date"
                                label="9 - zakDate"
                            />

                            <FormItem
                                id="zakDateShp"
                                type="date"
                                label="10 - zakDateShp"
                            />

                            <FormItem
                                id="zakDateRcv"
                                type="date"
                                label="11 - zakDateRcv"
                            />

                            <FormItem
                                id="zakDateProtct"
                                type="date"
                                label="12 - zakDateProtct"
                            />


                            <Row style={{display: this.state.dbMessage.sqlMessage || this.state.dbMessage.affectedRows  ? 'block' : 'none'}}>
                                <Alert bsStyle={this.state.dbError ? 'danger' : 'success'}>
                                    <h4>{this.state.dbError ? 'Error' : 'Success'}</h4>
                                    <div>{this.state.dbMessage.code}</div>
                                    <div>{this.state.dbMessage.sqlMessage}</div>
                                    <div>{this.state.dbMessage.message}</div>
                                </Alert>;
                            </Row>

                            <div className='text-center' >
                                <Button bsStyle="primary" type="submit" bsSize='large'>Submit</Button>
                            </div>

                        </form>
                    </Col>

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


const ReduxBarnForm = reduxForm({
    // a unique name for the form
    form: 'BarnForm',
    // enableReinitialize: true
    validate(values) {
        const errors = {};

        // idProduct
        if (!values.idProduct) {
            errors.idProduct = 'ожидается idProduct';
        }
        // zakNumber
        if (!values.zakNumber) {
            errors.zakNumber = 'ожидается zakNumber';
        }
        if (values.zakNumber && !values.zakNumber.toString().match(/^\d+$/)) {
            errors.zakNumber = 'возможно ввести только числа';
        }

        // zakLink
        if (values.zakLink && !values.zakLink.match(/^https:\/\/.*aliexpress.*\?order_id=\d+$/)) {
            errors.zakLink = 'неправильная ссылка zakLink';
        }
        if (values.zakNumber && values.zakLink && values.zakLink.match(/\d+(?=$)/) && values.zakLink.match(/\d+(?=$)/)[0] !== values.zakNumber.toString()) {
            errors.zakLink = 'zakNumber и zakLink должны соответсвовать';
        }
        if (values.zakNumber && !values.zakLink) {
            errors.zakLink = 'ожидается zakLink';
        }

        // zakQnty
        if (!values.zakQnty) {
            errors.zakQnty = 'ожидается zakQnty';
        }
        if (values.zakQnty && !values.zakQnty.toString().match(/^\d+$/)) {
            errors.zakQnty = 'возможно ввести только числа';
        }

        // frozQnty
        if (values.frozQnty && !values.frozQnty.toString().match(/^\d+$/)) {
            errors.frozQnty = 'возможно ввести только числа';
        }

        // restQnty
        if (values.restQnty && !values.restQnty.toString().match(/^\d+$/)) {
            errors.restQnty = 'возможно ввести только числа';
        }

        // zakSum
        if (!values.zakSum) {
            errors.zakSum = 'ожидается zakSum';
        }

        // curRate
        if (!values.curRate) {
            errors.curRate = 'ожидается curRate';
        }
        if (values.curRate && !values.curRate.toString().match(/^\d+(.\d{1,4})?$/)) {
            errors.curRate = 'возможно ввести только числа не больше 100 с 4 знаками после точки';
        }
        if (values.curRate >= 100) {
            errors.curRate = 'curRate ожидается меньше 100';
        }

        // zakDate
        if (!values.zakDate) {
            errors.zakDate = 'ожидается zakDate';
        }

        // if (!values.zakDateShp) {
        //     errors.zakDateShp = 'Required zakDateShp';
        // }
        //
        // if (!values.zakDateRcv) {
        //     errors.zakDateRcv = 'Required zakDateRcv';
        // }
        //
        // if (!values.zakDateProtct) {
        //     errors.zakDateProtct = 'Required zakDateProtct';
        // }

        return errors;
    },

}, mapStateToProps
)(BarnForm);



export default connect(null)(ReduxBarnForm);
