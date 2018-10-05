import React from 'react';
import { reduxForm, reset } from 'redux-form';
import FormItem from './common/FormItem.jsx';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { change } from 'redux-form';

import api from 'AliasApi/api';

import { alertMessage } from '../redux/actions/sysdialogs-actions.js';
import { withRouter } from 'react-router-dom';
import moment from 'moment';




class BarnForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            options: [],
        };
    }

    // resetForm() {
    //     this.props.dispatch(reset('BarnForm'));
    // }

    print = (data) => {
        // TODO: get only changed fields
        const copyData = {...data}; // do not mutate data!!!!
        delete copyData.productName; // this field for view only and belongs to another table

        if (this.props.type === 'put') {
            return api.updateBarn(this.props.hash, copyData)
                .then(resp => {
                    this.props.dispatch(alertMessage({
                        msg: `Заказ номер ${data.zakNumber} для продукта "${data.productName}" обновлен`,
                        type: 'success'
                    }));
                    this.props.history.push('/barn/purchase');
                    return null;
                })
                .catch(err => {
                    this.props.dispatch(alertMessage({
                        msg: `Вознкла ошибка при обновлении заказа номер ${data.zakNumber} для продукта "${data.productName}"`,
                        type: 'danger'
                    }));
                });
        } else {
            return api.postToBarn(copyData)
                .then(resp => {
                    this.props.dispatch(alertMessage({
                        msg: `Заказ номер ${data.zakNumber} для продукта "${data.productName}" добавлен`,
                        type: 'success'
                    }));
                    this.props.history.push('/barn/purchase');
                    return null;
                })
                .catch(err => {
                    this.props.dispatch(alertMessage({
                        msg: `Вознкла ошибка при добавлении заказа номер ${data.zakNumber} для продукта "${data.productName}"`,
                        type: 'danger'
                    }));
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
        console.log(selected);
        if (selected && selected.length > 0) {
            this.props.dispatch(change('BarnForm', 'idProduct', selected[0].idProduct));
            this.props.dispatch(change('BarnForm', 'productName', selected[0].productName));
        } else {
            this.props.dispatch(change('BarnForm', 'idProduct', ''));
            this.props.dispatch(change('BarnForm', 'productName', ''));
        }
    }

    render() {
        return (

            <Grid style={{paddingBottom: '25px'}}>

                <Row>
                    <Col smOffset={3}>
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
                                step="0.1"
                            />

                            <FormItem
                                id="zakDate"
                                type="date"
                                label="9 - zakDate"
                                disabled={!this.props.type}
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

                            <Row>
                                <Col smOffset={3}>
                                    <Button bsStyle="primary" type="submit" bsSize='large' disabled={this.props.submitting || this.props.pristine}>Submit</Button>
                                </Col>
                            </Row>

                        </form>
                    </Col>

                </Row>

            </Grid>

        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log('mapStateToProps');
    return {
        initialValues: ownProps.initialValues
    };
}

const withRouterBarnForm = withRouter(BarnForm);


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
        if (values.zakLink && !values.zakLink.match(/^https:\/\/.*aliexpress.*\?(order_id=|orderId=)\d+$/)) {
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

        // zakDateShp
        if (values.zakDate && values.zakDateShp && !moment(values.zakDateShp, 'YYYY-MM-DD').isSameOrAfter(moment(values.zakDate, 'YYYY-MM-DD'))) {
            errors.zakDateShp = 'zakDateShp не может быть меньше zakDate';
        }

        // zakDateRcv
        if (values.zakDateShp && values.zakDateRcv && !moment(values.zakDateRcv, 'YYYY-MM-DD').isSameOrAfter(moment(values.zakDateShp, 'YYYY-MM-DD'))) {
            errors.zakDateRcv = 'zakDateRcv не может быть меньше zakDateShp';
        }

        // zakDateProtct
        if (values.zakDateRcv && values.zakDateProtct && !moment(values.zakDateProtct, 'YYYY-MM-DD').isSameOrAfter(moment(values.zakDateRcv, 'YYYY-MM-DD'))) {
            errors.zakDateProtct = 'zakDateProtct не может быть меньше zakDateRcv';
        }

        return errors;
    },

}, mapStateToProps
)(withRouterBarnForm);



export default connect(null)(ReduxBarnForm);
